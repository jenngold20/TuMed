package com.g2.clinicaBack.service.impl;

import com.g2.clinicaBack.dto.RatingDto;
import com.g2.clinicaBack.mapper.RatingMaper;
import com.g2.clinicaBack.models.Rating;
import com.g2.clinicaBack.repository.RatingRepository;
import com.g2.clinicaBack.service.RatingService;
import org.springframework.stereotype.Service;

@Service
public class RatingServiceImpl implements RatingService {
   private final RatingRepository ratingRepository;

    public RatingServiceImpl(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @Override
    public Rating addRating(RatingDto ratingDto) {
        return  ratingRepository.save(RatingMaper.toModel(ratingDto));
    }

    @Override
    public Rating calculateAverageRatingByDoctorId(Long id) {
        return null;
    }
}
