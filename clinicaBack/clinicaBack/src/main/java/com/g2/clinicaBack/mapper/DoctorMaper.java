package com.g2.clinicaBack.mapper;


import com.g2.clinicaBack.dto.*;
import com.g2.clinicaBack.models.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DoctorMaper {

    public static DoctorDto toDoctorDto(Doctor doctor) {
        DoctorDto doctorDto = new DoctorDto();
        doctorDto.setDoctorId(doctor.getDoctorId());
        doctorDto.setFirtName(doctor.getFirtName());
        doctorDto.setLastname(doctor.getLastname());
        doctorDto.setMv(doctor.getMv());
        doctorDto.setDescription(doctor.getDescription());
        doctorDto.setRating(doctor.getCalculatedRating());

        List<ImageGaleryDto> imageGaleryDtos = new ArrayList<>();
        for (ImageGalery imageGalery : doctor.getImageGalleries()) {
            ImageGaleryDto imageGaleryDto = new ImageGaleryDto();
            imageGaleryDto.setId(imageGalery.getId());
            imageGaleryDto.setImagePath(imageGalery.getImagePath());
            imageGaleryDtos.add(imageGaleryDto);
        }
        doctorDto.setImageGalleries(imageGaleryDtos);

        SpecialityDto specialityDto = SpecialityMaper.toSpecialityDto(doctor.getSpeciality());
        doctorDto.setSpeciality(specialityDto);

        List<CharacteristicDto> characteristicDtos= new ArrayList<>();
        for (Characteristic characteristic: doctor.getCharacteristics()) {
            CharacteristicDto characteristicDto = CharacteristicMaper.toCharacteristicDto(characteristic);
            characteristicDtos.add(characteristicDto);
        }
        doctorDto.setCharacteristics(characteristicDtos);

        // Agregar horarios a DoctorDto
        List<DoctorScheduleDto> scheduleDtos = new ArrayList<>();
        for (DoctorSchedule schedule : doctor.getDoctorSchedules()) {
            DoctorScheduleDto scheduleDto = new DoctorScheduleDto();
            scheduleDto.setId(schedule.getId());
            scheduleDto.setDayOfWeek(schedule.getDayOfWeek());
            scheduleDto.setStartTime(schedule.getStartTime());
            scheduleDto.setEndTime(schedule.getEndTime());
            scheduleDtos.add(scheduleDto);
        }
        doctorDto.setDoctorSchedules(scheduleDtos);
        return doctorDto;
    }

    public static Doctor toDoctor(DoctorDto doctorDto) {
        Doctor doctor = new Doctor();
        doctor.setDoctorId(doctorDto.getDoctorId());
        doctor.setFirtName(doctorDto.getFirtName());
        doctor.setLastname(doctorDto.getLastname());
        doctor.setMv(doctorDto.getMv());
        doctor.setDescription(doctorDto.getDescription());

        // Mapear la lista de ImageGaleryDto a ImageGalery
        List<ImageGalery> imageGaleries = new ArrayList<>();
        for (ImageGaleryDto imageGaleryDto : doctorDto.getImageGalleries()) {
            ImageGalery imageGalery = new ImageGalery();
            imageGalery.setId(imageGaleryDto.getId());
            imageGalery.setImagePath(imageGaleryDto.getImagePath());
            imageGalery.setDoctor(doctor);
            imageGaleries.add(imageGalery);
        }
        doctor.setImageGalleries(imageGaleries);

        // Mapear SpecialityDto a Speciality
        Speciality speciality = SpecialityMaper.toSpeciality(doctorDto.getSpeciality());
        doctor.setSpeciality(speciality);

        List<Characteristic> characteristics= new ArrayList<>();
        for (CharacteristicDto characteristicDto: doctorDto.getCharacteristics()) {
            Characteristic characteristic = CharacteristicMaper.toCharacteristic(characteristicDto);
            characteristics.add(characteristic);
        }
        doctor.setCharacteristics(characteristics);

        return doctor;
    }

    public static DoctorDto toDoctorSpecialityDto(Doctor doctor) {
        DoctorDto doctorDto = new DoctorDto();
        doctorDto.setDoctorId(doctor.getDoctorId());
        doctorDto.setFirtName(doctor.getFirtName());
        doctorDto.setLastname(doctor.getLastname());
        doctorDto.setMv(doctor.getMv());
        doctorDto.setDescription(doctor.getDescription());


        List<CharacteristicDto> characteristicDtos= new ArrayList<>();
        for (Characteristic characteristic: doctor.getCharacteristics()) {
            CharacteristicDto characteristicDto = CharacteristicMaper.toCharacteristicDto(characteristic);
            characteristicDtos.add(characteristicDto);
        }
        doctorDto.setCharacteristics(characteristicDtos);

        return doctorDto;
    }

    public static DoctorUserDto toDoctorUserDto(Doctor doctor) {
        DoctorUserDto doctorUserDto = new DoctorUserDto();
        doctorUserDto.setDoctorId(doctor.getDoctorId());
        doctorUserDto.setFirtName(doctor.getFirtName());
        doctorUserDto.setLastname(doctor.getLastname());
        doctorUserDto.setMv(doctor.getMv());
        doctorUserDto.setDescription(doctor.getDescription());
        doctorUserDto.setSpecialityId(doctor.getSpeciality().getSpecialityId());
        return doctorUserDto;
    }
}



