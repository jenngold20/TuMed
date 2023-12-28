package com.g2.clinicaBack.models;

import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "imageGalery")
@Data
public class ImageGalery {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String imagePath;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "speciality_id")
    private Speciality speciality;
}
