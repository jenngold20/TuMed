package com.g2.clinicaBack.controllers;

import com.g2.clinicaBack.dto.RatingDto;
import com.g2.clinicaBack.models.Rating;
import com.g2.clinicaBack.service.RatingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rating")
@CrossOrigin(origins="*")
public class RatingController {

    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @PostMapping
    public ResponseEntity<RatingDto> addRating(@RequestBody RatingDto ratingDto){
        ratingService.addRating(ratingDto);
        return ResponseEntity.ok(ratingDto);
    }

}
