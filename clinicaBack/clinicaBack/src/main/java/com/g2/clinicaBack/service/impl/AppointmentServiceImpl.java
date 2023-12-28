package com.g2.clinicaBack.service.impl;

import com.g2.clinicaBack.dto.AppointmentDto;
import com.g2.clinicaBack.mapper.AppointmentMaper;
import com.g2.clinicaBack.models.Appointment;
import com.g2.clinicaBack.repository.AppointmentRepository;
import com.g2.clinicaBack.service.AppointmentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    private final AppointmentRepository appointmentRepository;


    public AppointmentServiceImpl(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public List<AppointmentDto> getAllAppointments() {
        List<Appointment> appointments = appointmentRepository.findAll();
        return appointments.stream()
                .map(AppointmentMaper::mapToDTO)
                .collect(Collectors.toList());
    }


}
