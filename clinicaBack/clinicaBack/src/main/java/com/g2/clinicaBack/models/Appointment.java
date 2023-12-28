package com.g2.clinicaBack.models;

import com.g2.clinicaBack.auth.model.User;
import lombok.Data;

import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
@Table(name = "Appointment")
@Data
public class Appointment {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long appointmentId;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Date appointmentDate;

    private Time appointmentTime;


}
