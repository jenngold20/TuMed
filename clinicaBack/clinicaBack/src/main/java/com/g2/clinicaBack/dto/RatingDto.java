package com.g2.clinicaBack.dto;

import com.g2.clinicaBack.models.Doctor;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

@Data
public class RatingDto {

    private Long id;
    private String description;
    @Min(value = 1, message = "El valor debe ser al menos 1")
    @Max(value = 5, message = "El valor debe ser como máximo 5")
    private Integer value;
    private Doctor doctor;

}
