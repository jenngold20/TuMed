package com.g2.clinicaBack.service.impl;

import com.g2.clinicaBack.auth.service.UserDetailsCustomService;
import com.g2.clinicaBack.dto.*;
import com.g2.clinicaBack.exception.ExceptionService;
import com.g2.clinicaBack.mapper.DoctorMaper;
import com.g2.clinicaBack.mapper.SpecialityMaper;
import com.g2.clinicaBack.models.*;
import com.g2.clinicaBack.repository.DoctorRepository;
import com.g2.clinicaBack.repository.SpecialityRepository;
import com.g2.clinicaBack.service.CharacteristicService;
import com.g2.clinicaBack.service.CloudService;
import com.g2.clinicaBack.service.DoctorService;
import com.g2.clinicaBack.util.Base64ToJpgConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;
    private final CharacteristicService characteristicService;
    private final SpecialityRepository specialityRepository;
    private final CloudService cloudService;
    private final UserDetailsCustomService userService;


    @Autowired
    public DoctorServiceImpl(DoctorRepository doctorRepository, CharacteristicService characteristicService, SpecialityRepository specialityRepository, CloudService cloudService, UserDetailsCustomService  userService) {
        this.characteristicService = characteristicService;
        this.doctorRepository = doctorRepository;
        this.specialityRepository = specialityRepository;
        this.cloudService = cloudService;
        this.userService = userService;
    }

    @Override
    public DoctorDto createDoctor(DoctorDto doctorDto) throws IOException {
        Integer mv = doctorDto.getMv();

        // Verificar si la matrícula ya existe
        Doctor existingDoctor = doctorRepository.findByMv(mv);
        if (existingDoctor != null) {
            throw new ExceptionService("No se puede crear el médico, la matrícula ya está en uso");
        }
        // Busca la especialidad
        Doctor doctor = DoctorMaper.toDoctor(doctorDto);
        Speciality speciality = SpecialityMaper.toSpeciality(doctorDto.getSpeciality());
        doctor.setSpeciality(speciality);

        // Lista para almacenar las imágenes asociadas al doctor
        List<ImageGalery> imageGaleries = new ArrayList<>();
        if (doctorDto.getImageGalleries() != null) {
            for (ImageGaleryDto image : doctorDto.getImageGalleries()) {
                File convertedFile = Base64ToJpgConverter.convertBase64ToJpgFile(image.getImagePath());
                try {
                    // Convierte el File en un MultipartFile para interactuar con cloudService
                    MultipartFile multipartFile = new MockMultipartFile(
                            convertedFile.getName(),
                            convertedFile.getName(),
                            "image/jpeg",
                            new FileInputStream(convertedFile)
                    );
                    // usa multipartFile para cargarlo en el servicio en la nube
                    Cloud output = cloudService.save(CloudDto.builder().file(multipartFile).build());
                    // Crear una nueva instancia de ImageGalery y configurar su URL
                   ImageGalery newImage = new ImageGalery();
                   newImage.setImagePath(output.getUrl());
                    // Asociar la imagen al doctor
                   newImage.setDoctor(doctor);
                   imageGaleries.add(newImage);
                } catch (IOException e) {
                    e.printStackTrace();
                    throw new ExceptionService("aca esta el problema");
                }
            }
        }
        // Asignar las imágenes al doctor
        doctor.setImageGalleries(imageGaleries);
        // Guardar el doctor en la base de datos
        doctor = doctorRepository.save(doctor);
        return DoctorMaper.toDoctorDto(doctor);
    }




    @Override
    public DoctorDto getDoctorById(Long doctorId) {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        Double rating = doctorRepository.calculateAverageRatingByDoctorId(doctorId);
        Speciality speciality = specialityRepository.findById(doctor.getSpeciality().getSpecialityId()).orElse(null);
        doctor.setSpeciality(speciality);
        doctor.setCalculatedRating(rating);
        return DoctorMaper.toDoctorDto(doctor);

    }

    @Override
    public List<DoctorDto> getAllDoctors() {

        List<Doctor> doctors = doctorRepository.findAll();

        for (Doctor doctor : doctors) {
            Double rating = doctorRepository.calculateAverageRatingByDoctorId(doctor.getDoctorId());
            doctor.setCalculatedRating(rating != null ? rating : 0.0);
        }

        return doctors.stream()
                .map(DoctorMaper::toDoctorDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<DoctorDto> getAllDoctorsRandom() {
        List<Doctor> doctors = doctorRepository.getRandomDoctorsFromCustomQuery();

        for (Doctor doctor : doctors) {
            Double rating = doctorRepository.calculateAverageRatingByDoctorId(doctor.getDoctorId());
            doctor.setCalculatedRating(rating != null ? rating : 0.0);
        }

        return doctors.stream()
                .map(DoctorMaper::toDoctorDto)
                .collect(Collectors.toList());
    }

    @Override
    public DoctorDto updateDoctor(Long doctorId, DoctorDto doctorDto) throws IOException {
        Doctor existingDoctor = doctorRepository.findById(doctorId).orElse(null);
        if (existingDoctor == null) {
            throw new ExceptionService("El id del doctor no existe");
        }
        // Busca la especialidad

        Doctor doctor = DoctorMaper.toDoctor(doctorDto);
        Speciality speciality = SpecialityMaper.toSpeciality(doctorDto.getSpeciality());
        doctor.setSpeciality(speciality);
        // Lista para almacenar las imágenes asociadas al doctor
        List<ImageGalery> imageGaleries = new ArrayList<>();
        if (doctorDto.getImageGalleries() != null) {
            for (ImageGaleryDto image : doctorDto.getImageGalleries()) {
                File convertedFile = Base64ToJpgConverter.convertBase64ToJpgFile(image.getImagePath());
                try {
                    // Convierte el File en un MultipartFile para interactuar con cloudService
                    MultipartFile multipartFile = new MockMultipartFile(
                            convertedFile.getName(),
                            convertedFile.getName(),
                            "image/jpeg",
                            new FileInputStream(convertedFile)
                    );
                    // usa multipartFile para cargarlo en el servicio en la nube
                    Cloud output = cloudService.save(CloudDto.builder().file(multipartFile).build());
                    // Crear una nueva instancia de ImageGalery y configurar su URL
                    ImageGalery newImage = new ImageGalery();
                    newImage.setImagePath(output.getUrl());
                    // Asociar la imagen al doctor
                    newImage.setDoctor(doctor);
                    imageGaleries.add(newImage);
                } catch (IOException e) {
                    e.printStackTrace();
                    throw new ExceptionService("aca esta el problema");
                }
            }
        }
        // Asignar las imágenes al doctor
        doctor.setImageGalleries(imageGaleries);
        doctor.setDoctorId(doctorId);
        // Guardar el doctor en la base de datos
        doctorRepository.save(doctor);
        return DoctorMaper.toDoctorDto(doctor);
    }

    @Override
    public void deleteDoctor(Long doctorId) {
        doctorRepository.deleteById(doctorId);

    }

    public Set<DoctorDto> findDoctorsByDateRange(LocalDate startDate, LocalDate endDate) {
        Set<DoctorDto> doctorsByDateRange = new HashSet<>();
        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            Locale spanishLocale = new Locale("es", "AR");
            DayOfWeek dayOfWeek = currentDate.getDayOfWeek();
            String dayOfWeekText = dayOfWeek.getDisplayName(TextStyle.FULL, spanishLocale);
            List<Doctor> doctors = doctorRepository.findByDoctorSchedulesDayOfWeek(dayOfWeekText);
            for (Doctor doctor : doctors) {
                DoctorDto doctorDto = DoctorMaper.toDoctorDto(doctor);
                doctorsByDateRange.add(doctorDto);
            }
            currentDate = currentDate.plusDays(1);
        }

        return doctorsByDateRange;
    }

    public List<String> findDoctorAppointments(Long doctorId, LocalDate date) {
        Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
        List<String> empty = new ArrayList<>();
        if (doctor == null) {
            empty.add("no exte el medico");
           return empty;
        }

       /* DayOfWeek dayOfWeek = date.getDayOfWeek();
        String dayOfWeekText = dayOfWeek.getDisplayName(TextStyle.FULL, Locale.getDefault());*/

        Locale spanishLocale = new Locale("es", "AR");
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        String dayOfWeekText = dayOfWeek.getDisplayName(TextStyle.FULL, spanishLocale);


        DoctorSchedule doctorSchedule = doctor.getDoctorSchedules().stream()
                .filter(schedule -> schedule.getDayOfWeek().equalsIgnoreCase(dayOfWeekText))
                .findFirst()
                .orElse(null);

        if (doctorSchedule == null) {
            empty.add("no hay turnos para el dia");
            return empty;
        }

        LocalTime startTime = doctorSchedule.getStartTime().toLocalTime();
        LocalTime endTime = doctorSchedule.getEndTime().toLocalTime();
        List<String> appointments = new ArrayList<>();

        while (startTime.isBefore(endTime)) {
            appointments.add(startTime.toString());
            startTime = startTime.plusMinutes(30);
        }
        return appointments;
    }


}

