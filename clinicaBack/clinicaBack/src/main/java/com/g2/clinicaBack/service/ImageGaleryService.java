package com.g2.clinicaBack.service;



import com.g2.clinicaBack.dto.ImageGaleryDto;

import java.io.IOException;
import java.util.List;

public interface ImageGaleryService {

    ImageGaleryDto createImageGalery(ImageGaleryDto imageGaleryDto) throws IOException;

    ImageGaleryDto getImageGaleryById(Long imageGaleryId);

    List<ImageGaleryDto> getAllImageGaleries();

    ImageGaleryDto updateImageGalery(Long imageGaleryId, ImageGaleryDto imageGaleryDto);

    void deleteImageGalery(Long imageGaleryId);
}