package com.g2.clinicaBack.service;


import com.g2.clinicaBack.dto.DoctorDto;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface DoctorService {
    DoctorDto createDoctor(DoctorDto doctorDto) throws IOException;
    DoctorDto getDoctorById(Long doctorId);
    List<DoctorDto> getAllDoctors();
    DoctorDto updateDoctor(Long doctorId, DoctorDto doctorDto) throws IOException;
    void deleteDoctor(Long doctorId);
    List<DoctorDto> getAllDoctorsRandom();

    Set<DoctorDto> findDoctorsByDateRange(LocalDate startDate, LocalDate endDate);

    List<String> findDoctorAppointments(Long doctorId, LocalDate date);
}
