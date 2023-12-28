package com.g2.clinicaBack.mapper;

import com.g2.clinicaBack.dto.AppointmentDto;
import com.g2.clinicaBack.models.Appointment;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMaper {

    public static AppointmentDto mapToDTO(Appointment appointment) {
        AppointmentDto dto = new AppointmentDto();
        dto.setAppointmentId(appointment.getAppointmentId());
        dto.setDoctorId(appointment.getDoctor().getDoctorId());
        dto.setUserId(appointment.getUser().getId());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setAppointmentTime(appointment.getAppointmentTime());
        return dto;
    }
}
