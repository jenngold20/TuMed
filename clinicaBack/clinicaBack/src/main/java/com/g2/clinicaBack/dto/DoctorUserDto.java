package com.g2.clinicaBack.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class DoctorUserDto {
    private Long doctorId;
    private String firtName;
    private String lastname;
    private Integer mv;
    private String description;
    private Long specialityId;
}
