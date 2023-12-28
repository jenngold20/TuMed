package com.g2.clinicaBack.controllers;

import com.g2.clinicaBack.dto.AppointmentDto;
import com.g2.clinicaBack.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins="*")
public class AppointmentController {
    private final AppointmentService appointmentService;

    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping("/all")
    public List<AppointmentDto> getAllAppointments() {
        return appointmentService.getAllAppointments();
    }
}
