package com.g2.clinicaBack.auth.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.g2.clinicaBack.models.Doctor;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AutenticacionResponse {
    private Long id;
    private String jwt;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private List<Doctor> favoriteDoctors;

}
