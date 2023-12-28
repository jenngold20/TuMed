package com.g2.clinicaBack.mapper;

import com.g2.clinicaBack.dto.RatingDto;
import com.g2.clinicaBack.models.Rating;

public class RatingMaper {

    public static Rating toModel(RatingDto ratingDto){
        Rating rating = new Rating();
        rating.setValue(ratingDto.getValue());
        rating.setDescription(ratingDto.getDescription());
        rating.setDoctor(ratingDto.getDoctor());
        return rating;
    }
}
