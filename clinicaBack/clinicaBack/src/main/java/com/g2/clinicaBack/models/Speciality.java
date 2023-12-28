package com.g2.clinicaBack.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "speciality")
@Data
public class Speciality {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long specialityId;
    private String name;
    private String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "speciality")
    private List<ImageGalery> imageGalleries;

    @OneToMany(mappedBy = "speciality")
    private List<Doctor> doctors = new ArrayList<>();
}
