package com.g2.clinicaBack.repository;

import com.g2.clinicaBack.models.Speciality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SpecialityRepository extends JpaRepository<Speciality, Long>{
    Speciality findByName(String specialityName);
    @Query("SELECT s FROM Speciality s LEFT JOIN FETCH s.doctors WHERE s.specialityId = :specialityId")
    Speciality findSpecialityWithDoctors(Long specialityId);

    List<Speciality> findBySpecialityIdIn(List<Long> specialityIds);

}
