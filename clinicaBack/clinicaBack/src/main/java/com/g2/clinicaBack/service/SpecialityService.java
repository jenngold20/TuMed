package com.g2.clinicaBack.service;


import com.g2.clinicaBack.dto.SpecialityDto;
import com.g2.clinicaBack.models.Speciality;

import java.io.IOException;
import java.util.List;


public interface SpecialityService {

    SpecialityDto createSpeciality(SpecialityDto specialityDto) throws IOException;
    SpecialityDto getSpecialityById(Long specialityId);
    List<SpecialityDto> getAllSpecialities();
    SpecialityDto updateSpeciality(Long specialityId, SpecialityDto specialityDto);
    void deleteSpeciality(Long specialityId);
    SpecialityDto getSpecialityByName(String specialityName);
    SpecialityDto getSpecialityWithDoctors(Long specialityId);
    List<SpecialityDto> getSpecialitiesByCategoriaIds(List<Long> specialityId);
}