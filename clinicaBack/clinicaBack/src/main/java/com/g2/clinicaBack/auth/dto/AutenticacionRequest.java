package com.g2.clinicaBack.auth.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AutenticacionRequest {

    private String email;
    private String password;

}
