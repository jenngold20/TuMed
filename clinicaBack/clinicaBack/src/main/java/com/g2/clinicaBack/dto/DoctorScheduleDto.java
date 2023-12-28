package com.g2.clinicaBack.dto;

import lombok.Data;

import java.sql.Time;


@Data
public class DoctorScheduleDto {
    private Long id;
    private String dayOfWeek;
    private Time startTime;
    private Time endTime;
}
