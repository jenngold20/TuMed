package com.g2.clinicaBack.repository;


import com.g2.clinicaBack.models.ImageGalery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public  interface ImageGaleryRepository extends JpaRepository<ImageGalery, Long> {
}
