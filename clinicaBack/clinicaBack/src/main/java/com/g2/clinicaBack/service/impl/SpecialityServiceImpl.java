package com.g2.clinicaBack.service.impl;


import com.g2.clinicaBack.dto.CloudDto;
import com.g2.clinicaBack.dto.DoctorDto;
import com.g2.clinicaBack.dto.ImageGaleryDto;
import com.g2.clinicaBack.dto.SpecialityDto;
import com.g2.clinicaBack.exception.ExceptionService;
import com.g2.clinicaBack.mapper.DoctorMaper;
import com.g2.clinicaBack.mapper.SpecialityMaper;
import com.g2.clinicaBack.models.Cloud;
import com.g2.clinicaBack.models.Doctor;
import com.g2.clinicaBack.models.ImageGalery;
import com.g2.clinicaBack.models.Speciality;
import com.g2.clinicaBack.repository.SpecialityRepository;
import com.g2.clinicaBack.service.CloudService;
import com.g2.clinicaBack.service.SpecialityService;
import com.g2.clinicaBack.util.Base64ToJpgConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import java.util.stream.Collectors;

@Service
public class SpecialityServiceImpl implements SpecialityService {

    private final SpecialityRepository specialityRepository;
    private final CloudService cloudService;


    @Autowired
    public SpecialityServiceImpl(SpecialityRepository specialityRepository,CloudService cloudService) {
        this.specialityRepository = specialityRepository;
        this.cloudService = cloudService;
    }

    @Override
    public SpecialityDto createSpeciality(SpecialityDto specialityDto) throws IOException {
        Speciality speciality = SpecialityMaper.toSpeciality(specialityDto);

        // Agregar imágenes a la especialidad
        List<ImageGalery> imageGaleries = new ArrayList<>();
        for (ImageGaleryDto image : specialityDto.getImageGalleries()) {
            File convertedFile = Base64ToJpgConverter.convertBase64ToJpgFile(image.getImagePath());

            try {
                // Convierte el File en un MultipartFile para interactuar con cloudService
                MultipartFile multipartFile = new MockMultipartFile(
                        convertedFile.getName(),
                        convertedFile.getName(),
                        "image/jpeg",
                        new FileInputStream(convertedFile)
                );

                // Ahora puedes usar multipartFile para cargarlo en el servicio en la nube
                Cloud output = cloudService.save(CloudDto.builder().file(multipartFile).build());

                // Crear una nueva instancia de ImageGalery y configurar su URL
                ImageGalery newImage = new ImageGalery();
                newImage.setImagePath(output.getUrl());

                // Asociar la imagen a la especialidad
                newImage.setSpeciality(speciality);

                imageGaleries.add(newImage);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        speciality.setImageGalleries(imageGaleries);

        speciality = specialityRepository.save(speciality);
        return SpecialityMaper.toSpecialityDto(speciality);
    }




    @Override
    public SpecialityDto getSpecialityById(Long specialityId) {
        Speciality speciality = specialityRepository.findById(specialityId).orElse(null);
        if (speciality != null) {
            return SpecialityMaper.toSpecialityDoctorDto(speciality);
        } else {
            throw new ExceptionService("La especialidad no existe ");
        }
    }

    @Override
    public List<SpecialityDto> getAllSpecialities() {
        List<Speciality> specialities = specialityRepository.findAll();
        return specialities.stream()
                .map(SpecialityMaper::toSpecialityDoctorDto)
                .collect(Collectors.toList());
    }

    @Override
    public SpecialityDto updateSpeciality(Long specialityId, SpecialityDto specialityDto) {
        Speciality existingSpeciality = specialityRepository.findById(specialityId).orElse(null);
        if (existingSpeciality == null) {
            // Lanza una excepción o devuelve un valor especial para indicar que la especialidad no existe.
            return null;
        }

        // Actualiza los atributos de la especialidad existente con los valores del DTO.
        existingSpeciality.setName(specialityDto.getName());
        existingSpeciality.setDescription(specialityDto.getDescription());

        // Guarda los cambios en la especialidad.
        existingSpeciality = specialityRepository.save(existingSpeciality);

        return SpecialityMaper.toSpecialityDto(existingSpeciality);
    }

    @Override
    public void deleteSpeciality(Long specialityId) {
        specialityRepository.deleteById(specialityId);
    }

    @Override
    public SpecialityDto getSpecialityByName(String specialityName) {
        Speciality speciality = specialityRepository.findByName(specialityName);
        if (speciality != null) {
            return SpecialityMaper.toSpecialityDto(speciality);
        } else {
            // Manejar el caso en que la especialidad no existe (opcional).
            return null;
        }
    }

    public SpecialityDto getSpecialityWithDoctors(Long specialityId) {
        Speciality speciality = specialityRepository.findById(specialityId).orElse(null);

        if (speciality != null) {
            SpecialityDto specialityDto = SpecialityMaper.toSpecialityDoctorDto(speciality);
            List<DoctorDto> doctorDtos = new ArrayList<>();

            for (Doctor doctor : speciality.getDoctors()) {
                DoctorDto doctorDto = DoctorMaper.toDoctorSpecialityDto(doctor);
                doctorDtos.add(doctorDto);
            }

            specialityDto.setDoctors(doctorDtos);

            return specialityDto;
        } else {
            return null;
        }
    }

    public List<SpecialityDto> getSpecialitiesByCategoriaIds(List<Long> categoriaIds) {
        List<Speciality> specialities = specialityRepository.findBySpecialityIdIn(categoriaIds);
        return specialities.stream()
                .map(SpecialityMaper::toSpecialityDoctorDto)
                .collect(Collectors.toList());
    }

}
