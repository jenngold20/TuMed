package com.g2.clinicaBack.service.impl;

import com.g2.clinicaBack.dto.CloudDto;
import com.g2.clinicaBack.dto.DoctorDto;
import com.g2.clinicaBack.dto.ImageGaleryDto;
import com.g2.clinicaBack.dto.SpecialityDto;
import com.g2.clinicaBack.mapper.DoctorMaper;
import com.g2.clinicaBack.mapper.ImageGaleryMaper;
import com.g2.clinicaBack.mapper.SpecialityMaper;
import com.g2.clinicaBack.models.Cloud;
import com.g2.clinicaBack.models.Doctor;
import com.g2.clinicaBack.models.ImageGalery;
import com.g2.clinicaBack.models.Speciality;
import com.g2.clinicaBack.repository.ImageGaleryRepository;
import com.g2.clinicaBack.service.CloudService;
import com.g2.clinicaBack.service.DoctorService;
import com.g2.clinicaBack.service.ImageGaleryService;
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
public class ImageGaleryServiceImpl implements ImageGaleryService {

    private final ImageGaleryRepository imageGaleryRepository;
    private final CloudService cloudService;
    private final DoctorService doctorService;
    private final SpecialityService specialityService;

    @Autowired
    public ImageGaleryServiceImpl(ImageGaleryRepository imageGaleryRepository,CloudService cloudService,DoctorService doctorService,SpecialityService specialityService) {
        this.imageGaleryRepository = imageGaleryRepository;
        this.cloudService = cloudService;
        this.doctorService = doctorService;
        this.specialityService = specialityService;

    }

    @Override
    public ImageGaleryDto createImageGalery(ImageGaleryDto imageGaleryDto) throws IOException {
        ImageGalery imageGalery = ImageGaleryMaper.toImageGalery(imageGaleryDto);

        List<ImageGalery> imageGaleries = new ArrayList<>();

        try {
            File convertedFile = Base64ToJpgConverter.convertBase64ToJpgFile(imageGaleryDto.getImagePath());

            // Converting the File to a MultipartFile to interact with cloudService
            MultipartFile multipartFile = new MockMultipartFile(
                    convertedFile.getName(),
                    convertedFile.getName(),
                    "image/jpeg",
                    new FileInputStream(convertedFile)
            );

            // Uploading the MultipartFile to the cloud service
            Cloud output = cloudService.save(CloudDto.builder().file(multipartFile).build());

            // Creating a new ImageGalery instance and configuring its URL
            ImageGalery newImage = new ImageGalery();
            newImage.setImagePath(output.getUrl());

            // Associating the image with a doctor or a speciality (similar to the doctor scenario)
            if (imageGaleryDto.getDoctorId() != null) {
                DoctorDto doctorDto = doctorService.getDoctorById(imageGaleryDto.getDoctorId());
                if (doctorDto != null) {
                    Doctor doctor = DoctorMaper.toDoctor(doctorDto); // Convert DTO to Doctor entity
                    newImage.setDoctor(doctor);
                } else {
                    // Handle the case where the doctor doesn't exist (optional).
                }
            } else if (imageGaleryDto.getSpecialityId() != null) {
                SpecialityDto specialityDto = specialityService.getSpecialityById(imageGaleryDto.getSpecialityId());
                if (specialityDto != null) {
                    Speciality speciality = SpecialityMaper.toSpeciality(specialityDto); // Convert DTO to Speciality entity
                    newImage.setSpeciality(speciality);
                } else {
                    // Handle the case where the speciality doesn't exist (optional).
                }
            }

            imageGaleries.add(newImage);
        } catch (IOException e) {
            e.printStackTrace();
        }

        imageGaleryRepository.saveAll(imageGaleries);
        return ImageGaleryMaper.toImageGaleryDto(imageGalery);
    }




    @Override
    public ImageGaleryDto getImageGaleryById(Long imageGaleryId) {
        ImageGalery imageGalery = imageGaleryRepository.findById(imageGaleryId).orElse(null);
        return ImageGaleryMaper.toImageGaleryDto(imageGalery);
    }

    @Override
    public List<ImageGaleryDto> getAllImageGaleries() {
        List<ImageGalery> imageGaleries = imageGaleryRepository.findAll();
        return imageGaleries.stream()
                .map(ImageGaleryMaper::toImageGaleryDto)
                .collect(Collectors.toList());
    }

    @Override
    public ImageGaleryDto updateImageGalery(Long imageGaleryId, ImageGaleryDto imageGaleryDto) {
        ImageGalery existingImageGalery = imageGaleryRepository.findById(imageGaleryId).orElse(null);
        if (existingImageGalery == null) {
            // Lanza una excepción o devuelve un valor especial para indicar que la galería de imágenes no existe.
            return null;
        }

        // Actualiza los atributos de la galería de imágenes existente con los valores del DTO.
        existingImageGalery.setImagePath(imageGaleryDto.getImagePath());

        // Guarda los cambios en la galería de imágenes.
        existingImageGalery = imageGaleryRepository.save(existingImageGalery);

        return ImageGaleryMaper.toImageGaleryDto(existingImageGalery);
    }

    @Override
    public void deleteImageGalery(Long imageGaleryId) {
        imageGaleryRepository.deleteById(imageGaleryId);
    }
}
