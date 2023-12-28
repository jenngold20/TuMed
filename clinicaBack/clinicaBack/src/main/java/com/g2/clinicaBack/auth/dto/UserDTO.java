package com.g2.clinicaBack.auth.dto;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.g2.clinicaBack.models.Doctor;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class UserDTO {

    @Email(message = "El correo electrónico no es válido")
    private String email;
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres")
    private String password;
    private String firstName;
    private String lastName;
    private String role;
    private Long id;
    private boolean emailVerified;
    private List<Doctor> favoriteDoctors = new ArrayList<>();
}
