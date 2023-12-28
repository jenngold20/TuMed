package com.g2.clinicaBack.service;

import com.g2.clinicaBack.dto.AppointmentDto;

import java.util.List;

public interface AppointmentService {

    List<AppointmentDto> getAllAppointments();
}
