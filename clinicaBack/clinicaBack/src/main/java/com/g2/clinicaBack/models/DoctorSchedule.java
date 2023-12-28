package com.g2.clinicaBack.models;
import lombok.Data;
import javax.persistence.*;

import java.sql.Time;
import java.util.List;


@Entity
@Table(name = "Doctor_Schedule")
@Data
public class DoctorSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dayOfWeek;

    @Column(name = "start_time")
    private Time startTime;

    @Column(name = "end_time")
    private Time endTime;

    @ManyToMany(mappedBy = "doctorSchedules")
    private List<Doctor> doctors;

}

