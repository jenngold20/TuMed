package com.g2.clinicaBack.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "Rating")
@Data
public class Rating {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String description;
    private Integer value;
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

 }
