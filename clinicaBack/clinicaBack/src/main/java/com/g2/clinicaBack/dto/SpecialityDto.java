package com.g2.clinicaBack.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class SpecialityDto {
    private Long specialityId;
    private String name;
    private String description;
    private List<DoctorDto> doctors;
    private List<ImageGaleryDto> imageGalleries;

    public SpecialityDto() {
        doctors = new ArrayList<>();
        imageGalleries = new ArrayList<>();
    }
}

