package com.g2.clinicaBack.repository;


import com.g2.clinicaBack.dto.DoctorDto;
import com.g2.clinicaBack.models.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    @Query(value = "SELECT * FROM 0723TDPRON2C02LAED0222PT_GRUPO2.random_doctors", nativeQuery = true)
    List<Doctor> getRandomDoctorsFromCustomQuery();

    Doctor findByMv(Integer mv);

    @Query("SELECT AVG(r.value) FROM Rating r WHERE r.doctor.id = :doctorId")
    Double calculateAverageRatingByDoctorId(@Param("doctorId") Long doctorId);

    List<Doctor> findByDoctorSchedulesDayOfWeek(String dayOfWeek);


}
