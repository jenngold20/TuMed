package com.g2.clinicaBack.controllers;


import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import com.g2.clinicaBack.exception.ExceptionService;
import com.g2.clinicaBack.models.ApiError;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
@RestController
@CrossOrigin(origins="*")
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ExceptionService.class)
    public ResponseEntity<ApiError> handleExceptionService(ExceptionService ex, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND; // O cualquier otro estado que quieras usar
        String customErrorMessage = ex.getMessage(); // Mensaje de la excepción personalizado

        ApiError apiError = new ApiError();
        apiError.setStatus(status.value());
        apiError.setError(status.getReasonPhrase());
        apiError.setMessage(customErrorMessage);

        return new ResponseEntity<>(apiError, status);
    }

}



