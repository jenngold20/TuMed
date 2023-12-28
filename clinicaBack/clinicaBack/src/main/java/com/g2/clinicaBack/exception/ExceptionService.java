package com.g2.clinicaBack.exception;

public class ExceptionService extends RuntimeException {
    public ExceptionService(String error) {
        super(error);
    }
}


