package com.g2.clinicaBack.models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Doctor")
@Data
public class Doctor {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long doctorId;

    private String firtName;
    private String lastname;
    private Integer mv;
    private String description;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "doctor")
    private List<ImageGalery> imageGalleries;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "speciality_id")
    private Speciality speciality;

    @ManyToMany
    @JoinTable(name = "doctor_characteristic",
            joinColumns = @JoinColumn(name = "doctor_Id"),
            inverseJoinColumns = @JoinColumn(name = "characteristic_id"))
    private List<Characteristic> characteristics = new ArrayList<>();

    @Transient
    private Double calculatedRating;
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "Doctor_DoctorSchedule",
            joinColumns = @JoinColumn(name = "doctor_id"),
            inverseJoinColumns = @JoinColumn(name = "schedule_id")
    )
    private List<DoctorSchedule> doctorSchedules;


}
