package com.g2.clinicaBack.models;

import lombok.Data;

@Data
public class ApiError {
    private int status;
    private String error;
    private String message;

}
