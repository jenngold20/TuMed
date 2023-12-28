package com.g2.clinicaBack.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class CharacteristicDto {

    private Long characteristicId;
    private String name;
    private String icon;
    private Boolean asset;

}
