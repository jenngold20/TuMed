package com.g2.clinicaBack.service;

import com.g2.clinicaBack.dto.RatingDto;
import com.g2.clinicaBack.models.Rating;

public interface RatingService {
    Rating addRating(RatingDto ratingDto);
    Rating calculateAverageRatingByDoctorId(Long id);
}
