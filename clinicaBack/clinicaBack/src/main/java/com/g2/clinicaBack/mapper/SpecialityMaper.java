package com.g2.clinicaBack.mapper;

import com.g2.clinicaBack.dto.DoctorDto;
import com.g2.clinicaBack.dto.ImageGaleryDto;
import com.g2.clinicaBack.dto.SpecialityDto;
import com.g2.clinicaBack.models.Doctor;
import com.g2.clinicaBack.models.ImageGalery;
import com.g2.clinicaBack.models.Speciality;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SpecialityMaper {

    public static SpecialityDto toSpecialityDto(Speciality speciality) {
        SpecialityDto specialityDto = new SpecialityDto();
        specialityDto.setSpecialityId(speciality.getSpecialityId());
        specialityDto.setName(speciality.getName());
        specialityDto.setDescription(speciality.getDescription());

        List<ImageGaleryDto> imageGaleryDtos = new ArrayList<>();
        for (ImageGalery imageGalery : speciality.getImageGalleries()) {
            ImageGaleryDto imageGaleryDto = new ImageGaleryDto();
            imageGaleryDto.setId(imageGalery.getId());
            imageGaleryDto.setImagePath(imageGalery.getImagePath());
            imageGaleryDtos.add(imageGaleryDto);
        }
        specialityDto.setImageGalleries(imageGaleryDtos);

        return specialityDto;
    }

    public static Speciality toSpeciality(SpecialityDto specialityDto) {
        Speciality speciality = new Speciality();
        speciality.setSpecialityId(specialityDto.getSpecialityId());
        speciality.setName(specialityDto.getName());
        speciality.setDescription(specialityDto.getDescription());

        List<ImageGalery> imageGaleries = new ArrayList<>();
        for (ImageGaleryDto imageGaleryDto : specialityDto.getImageGalleries()) {
            ImageGalery imageGalery = new ImageGalery();
            imageGalery.setId(imageGaleryDto.getId());
            imageGalery.setImagePath(imageGaleryDto.getImagePath());
            imageGaleries.add(imageGalery);
        }
        speciality.setImageGalleries(imageGaleries);

        return speciality;
    }


    public static SpecialityDto toSpecialityDoctorDto(Speciality speciality) {
        SpecialityDto specialityDto = new SpecialityDto();
        specialityDto.setSpecialityId(speciality.getSpecialityId());
        specialityDto.setName(speciality.getName());
        specialityDto.setDescription(speciality.getDescription());

        // Mapeo de la lista de ImageGalleries
        List<ImageGaleryDto> imageGaleryDtos = new ArrayList<>();
        for (ImageGalery imageGalery : speciality.getImageGalleries()) {
            ImageGaleryDto imageGaleryDto = new ImageGaleryDto();
            imageGaleryDto.setId(imageGalery.getId());
            imageGaleryDto.setImagePath(imageGalery.getImagePath());
            imageGaleryDtos.add(imageGaleryDto);
        }
        specialityDto.setImageGalleries(imageGaleryDtos);

        // Mapeo de la lista de Doctors
        List<DoctorDto> doctorDtos = new ArrayList<>();
        for (Doctor doctor : speciality.getDoctors()) {
            DoctorDto doctorDto = new DoctorDto();
            // Mapear otros atributos del DoctorDto aquí si es necesario
            doctorDtos.add(DoctorMaper.toDoctorDto(doctor));
        }
        specialityDto.setDoctors(doctorDtos);

        return specialityDto;
    }

}
