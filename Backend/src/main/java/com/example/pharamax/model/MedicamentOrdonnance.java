package com.example.pharamax.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
@Entity
public class MedicamentOrdonnance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // si médicament hors stock
    private String nomManuel;

    // nombre de comprimés par jour
    private Integer posologie;

    @ManyToOne
    private MedicamentStock medicamentStock;
    // null si hors stock

    @ManyToOne(optional = false)
    @JsonIgnore
    private Ordonnance ordonnance;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomManuel() {
        return nomManuel;
    }

    public void setNomManuel(String nomManuel) {
        this.nomManuel = nomManuel;
    }

    public Integer getPosologie() {
        return posologie;
    }

    public void setPosologie(Integer posologie) {
        this.posologie = posologie;
    }

    public MedicamentStock getMedicamentStock() {
        return medicamentStock;
    }

    public void setMedicamentStock(MedicamentStock medicamentStock) {
        this.medicamentStock = medicamentStock;
    }

    public Ordonnance getOrdonnance() {
        return ordonnance;
    }

    public void setOrdonnance(Ordonnance ordonnance) {
        this.ordonnance = ordonnance;
    }
}

