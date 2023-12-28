package com.g2.clinicaBack.service;

import com.g2.clinicaBack.auth.dto.UserDTO;
import com.g2.clinicaBack.exception.ExceptionService;

public interface EmailService {

    void sendWelcomeEmailTo(UserDTO user) throws ExceptionService;
}
