package com.g2.clinicaBack.auth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class UserDoctorDto {

        private Long userId;
        private Long doctorId;
        private boolean addToFavorites;

}


