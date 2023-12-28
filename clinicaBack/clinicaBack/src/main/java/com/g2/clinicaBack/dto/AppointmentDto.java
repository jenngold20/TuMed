package com.g2.clinicaBack.dto;

import lombok.Data;

import java.sql.Time;
import java.util.Date;

@Data
public class AppointmentDto {
    private Long appointmentId;
    private Long doctorId;
    private Long userId;
    private Date appointmentDate;
    private Time appointmentTime;
}
