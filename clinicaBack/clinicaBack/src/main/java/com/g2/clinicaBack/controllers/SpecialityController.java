package com.g2.clinicaBack.controllers;


import com.g2.clinicaBack.dto.SpecialityDto;
import com.g2.clinicaBack.service.SpecialityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/specialities")
@CrossOrigin(origins="*")
public class SpecialityController {

    private final SpecialityService specialityService;

    @Autowired
    public SpecialityController(SpecialityService specialityService) {
        this.specialityService = specialityService;
    }

    @PostMapping
    public ResponseEntity<SpecialityDto> createSpeciality(@RequestBody SpecialityDto specialityDto) throws IOException {
        SpecialityDto createdSpeciality = specialityService.createSpeciality(specialityDto);
        return new ResponseEntity<>(createdSpeciality, HttpStatus.CREATED);
    }

    @GetMapping("/{specialityId}")
    public ResponseEntity<SpecialityDto> getSpecialityById(@PathVariable Long specialityId) {
        SpecialityDto specialityDto = specialityService.getSpecialityById(specialityId);
        if (specialityDto != null) {
            return new ResponseEntity<>(specialityDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping
    public ResponseEntity<List<SpecialityDto>> getAllSpecialities() {
        List<SpecialityDto> specialities = specialityService.getAllSpecialities();
        return new ResponseEntity<>(specialities, HttpStatus.OK);
    }

    @PutMapping("/{specialityId}")
    public ResponseEntity<SpecialityDto> updateSpeciality(
            @PathVariable Long specialityId,
            @RequestBody SpecialityDto specialityDto
    ) {
        SpecialityDto updatedSpeciality = specialityService.updateSpeciality(specialityId, specialityDto);
        if (updatedSpeciality != null) {
            return new ResponseEntity<>(updatedSpeciality, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{specialityId}")
    public ResponseEntity<Void> deleteSpeciality(@PathVariable Long specialityId) {
        specialityService.deleteSpeciality(specialityId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/doctor/{specialityId}")
    public ResponseEntity<SpecialityDto> getSpecialityWithDoctors(@PathVariable Long specialityId) {
        SpecialityDto specialityDto = specialityService.getSpecialityWithDoctors(specialityId);

        if (specialityDto != null) {
            return ResponseEntity.ok(specialityDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/specialities")
    public ResponseEntity<List<SpecialityDto>> getSpecialitiesByCategoriaIds(@RequestParam List<Long> categoriaIds) {
        List<SpecialityDto> specialities = specialityService.getSpecialitiesByCategoriaIds(categoriaIds);
        return new ResponseEntity<>(specialities, HttpStatus.OK);
    }

}
