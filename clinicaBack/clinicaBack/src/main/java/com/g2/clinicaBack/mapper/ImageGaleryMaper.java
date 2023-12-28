package com.g2.clinicaBack.mapper;


import com.g2.clinicaBack.dto.ImageGaleryDto;
import com.g2.clinicaBack.models.ImageGalery;
import org.springframework.stereotype.Component;

@Component
public class ImageGaleryMaper {

    public static ImageGaleryDto toImageGaleryDto(ImageGalery imageGalery) {
        ImageGaleryDto imageGaleryDto = new ImageGaleryDto();
        imageGaleryDto.setId(imageGalery.getId());
        imageGaleryDto.setImagePath(imageGalery.getImagePath());
        // Puedes mapear otros atributos de ImageGalery si es necesario
        return imageGaleryDto;
    }

    public static ImageGalery toImageGalery(ImageGaleryDto imageGaleryDto) {
        ImageGalery imageGalery = new ImageGalery();
        imageGalery.setId(imageGaleryDto.getId());
        imageGalery.setImagePath(imageGaleryDto.getImagePath());
        // Puedes mapear otros atributos de ImageGaleryDto si es necesario
        return imageGalery;
    }
}

