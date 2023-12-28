package com.g2.clinicaBack.models;


import lombok.Data;
import javax.persistence.*;


@Entity
@Table(name = "characteristic")
@Data
public class Characteristic {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long characteristicId;
    private String name;
    private String icon;
    private Boolean asset;

}
