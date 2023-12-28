package com.g2.clinicaBack.repository;

import com.g2.clinicaBack.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    @Query("SELECT AVG(r.value) FROM Rating r WHERE r.doctor.id = :doctorId")
    Double calculateAverageRatingByDoctorId(@Param("doctorId") Long doctorId);

}
