package com.g2.clinicaBack.controllers;


import com.g2.clinicaBack.dto.ImageGaleryDto;
import com.g2.clinicaBack.service.ImageGaleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/image")
@CrossOrigin(origins="*")

public class ImageGaleryController {

    private final ImageGaleryService imageGaleryService;

    @Autowired
    public ImageGaleryController(ImageGaleryService imageGaleryService) {
        this.imageGaleryService = imageGaleryService;
    }

    @PostMapping
    public ResponseEntity<ImageGaleryDto> createImageGalery(@RequestBody ImageGaleryDto imageGaleryDto) throws IOException {
        ImageGaleryDto createdImageGalery = imageGaleryService.createImageGalery(imageGaleryDto);
        return new ResponseEntity<>(createdImageGalery, HttpStatus.CREATED);
    }

    @GetMapping("/{imageGaleryId}")
    public ResponseEntity<ImageGaleryDto> getImageGaleryById(@PathVariable Long imageGaleryId) {
        ImageGaleryDto imageGaleryDto = imageGaleryService.getImageGaleryById(imageGaleryId);
        if (imageGaleryDto != null) {
            return new ResponseEntity<>(imageGaleryDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<ImageGaleryDto>> getAllImageGaleries() {
        List<ImageGaleryDto> imageGaleries = imageGaleryService.getAllImageGaleries();
        return new ResponseEntity<>(imageGaleries, HttpStatus.OK);
    }

    @PutMapping("/{imageGaleryId}")
    public ResponseEntity<ImageGaleryDto> updateImageGalery(@PathVariable Long imageGaleryId, @RequestBody ImageGaleryDto imageGaleryDto) {
        ImageGaleryDto updatedImageGalery = imageGaleryService.updateImageGalery(imageGaleryId, imageGaleryDto);
        if (updatedImageGalery != null) {
            return new ResponseEntity<>(updatedImageGalery, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{imageGaleryId}")
    public ResponseEntity<Void> deleteImageGalery(@PathVariable Long imageGaleryId) {
        imageGaleryService.deleteImageGalery(imageGaleryId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
