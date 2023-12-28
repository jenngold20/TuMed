package com.g2.clinicaBack.repository;

import com.g2.clinicaBack.models.Characteristic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacteristicRespository extends JpaRepository<Characteristic, Long> {


}
