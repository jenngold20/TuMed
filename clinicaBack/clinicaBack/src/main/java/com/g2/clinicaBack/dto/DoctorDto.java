package com.g2.clinicaBack.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.g2.clinicaBack.models.DoctorSchedule;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class DoctorDto {
    private Long doctorId;
    private String firtName;
    private String lastname;
    private Integer mv;
    private String description;
    private List<ImageGaleryDto> imageGalleries;
    private SpecialityDto speciality;
    private List<CharacteristicDto> characteristics;
    private boolean isFavorite;
    private Double rating;
    private List<DoctorScheduleDto> doctorSchedules;

    public DoctorDto() {

        imageGalleries = new ArrayList<>();
        characteristics = new ArrayList<>();
        doctorSchedules = new ArrayList<>();
    }

}
