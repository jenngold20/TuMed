package com.g2.clinicaBack.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class ImageGaleryDto {
    private Long id;
    private String imagePath;
    private Long doctorId;
    private Long specialityId;
}
