package com.g2.clinicaBack.controllers;


import com.g2.clinicaBack.dto.CharacteristicDto;
import com.g2.clinicaBack.dto.DoctorDto;
import com.g2.clinicaBack.dto.SpecialityDto;
import com.g2.clinicaBack.service.CharacteristicService;
import com.g2.clinicaBack.service.DoctorService;
import com.g2.clinicaBack.service.SpecialityService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins="*")
public class DoctorController {

    private final DoctorService doctorService;
    private final SpecialityService specialityService;
    private final CharacteristicService characteristicService;



    @Autowired
    public DoctorController(DoctorService doctorService, SpecialityService specialityService, CharacteristicService characteristicService) {
        this.doctorService = doctorService;
        this.specialityService = specialityService;
        this.characteristicService = characteristicService;
    }

    @PostMapping
    public ResponseEntity<DoctorDto> createDoctor(@RequestBody DoctorDto doctorDto) throws IOException {
        // Verificar si el DoctorDto tiene una especialidad asociada
        SpecialityDto specialityDto = doctorDto.getSpeciality();
        if (specialityDto != null) {
            Long specialityId = specialityDto.getSpecialityId();
            SpecialityDto existingSpeciality = specialityService.getSpecialityById(specialityId);
            doctorDto.setSpeciality(existingSpeciality);
        }
        List<CharacteristicDto> characteristicDtosAdd = new ArrayList<>();
        List<CharacteristicDto> characteristicDtos = doctorDto.getCharacteristics();
        for (CharacteristicDto characteristicDto : characteristicDtos) {
            Long characteristicId = characteristicDto.getCharacteristicId();
            CharacteristicDto existingCharacteristic = characteristicService.getCharacteristicById(characteristicId);
            characteristicDtosAdd.add(existingCharacteristic);
        }
        doctorDto.setCharacteristics(characteristicDtosAdd);
        DoctorDto createdDoctor = doctorService.createDoctor(doctorDto);
        return new ResponseEntity<>(createdDoctor, HttpStatus.CREATED);
    }

    @GetMapping("/{doctorId}")
    public ResponseEntity<DoctorDto> getDoctorById(@PathVariable Long doctorId) {
        DoctorDto doctorDto = doctorService.getDoctorById(doctorId);
        if (doctorDto != null) {
            return new ResponseEntity<>(doctorDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<List<DoctorDto>> getAllDoctors() {
        List<DoctorDto> doctors = doctorService.getAllDoctors();
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    @GetMapping("/random")
    public ResponseEntity<List<DoctorDto>> getAllDoctorsRandom() {
        List<DoctorDto> doctors = doctorService.getAllDoctorsRandom();
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    @PutMapping("/{doctorId}")
    public ResponseEntity<DoctorDto> updateDoctor(@PathVariable Long doctorId, @RequestBody DoctorDto doctorDto) throws IOException {
        // Verificar si el DoctorDto tiene una especialidad asociada
        SpecialityDto specialityDto = doctorDto.getSpeciality();
        if (specialityDto != null) {
            Long specialityId = specialityDto.getSpecialityId();
            SpecialityDto existingSpeciality = specialityService.getSpecialityById(specialityId);
            doctorDto.setSpeciality(existingSpeciality);
        }
        List<CharacteristicDto> characteristicDtosAdd = new ArrayList<>();
        List<CharacteristicDto> characteristicDtos = doctorDto.getCharacteristics();
        for (CharacteristicDto characteristicDto : characteristicDtos) {
            Long characteristicId = characteristicDto.getCharacteristicId();
            CharacteristicDto existingCharacteristic = characteristicService.getCharacteristicById(characteristicId);
            characteristicDtosAdd.add(existingCharacteristic);
        }
        doctorDto.setCharacteristics(characteristicDtosAdd);
        DoctorDto updatedDoctor = doctorService.updateDoctor(doctorId, doctorDto);
        return new ResponseEntity<>(updatedDoctor, HttpStatus.OK);
    }



    @DeleteMapping("/{doctorId}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long doctorId) {
        doctorService.deleteDoctor(doctorId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/search")
    public ResponseEntity<Set<DoctorDto>> searchDoctorsByDateRange(
            @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        Set<DoctorDto> doctors = doctorService.findDoctorsByDateRange(startDate, endDate);
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/{doctorId}/appointments")
    public ResponseEntity<List<String>> getDoctorAppointments(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<String> appointments = doctorService.findDoctorAppointments(doctorId, date);

        if (appointments.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(appointments);
    }
}
