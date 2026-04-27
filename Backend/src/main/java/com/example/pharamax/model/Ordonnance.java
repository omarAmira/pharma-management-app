package com.example.pharamax.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Ordonnance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Patient patient;

    private String sourceOrdonnance;
    private LocalDate dateOrdonnance;
    private LocalDate dateRdv;

    // en mois par exemple
    private Integer dureeTraitement;

    @OneToMany(mappedBy = "ordonnance",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<MedicamentOrdonnance> medicaments = new ArrayList<>();
    // Getters / Setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getSourceOrdonnance() {
        return sourceOrdonnance;
    }

    public void setSourceOrdonnance(String sourceOrdonnance) {
        this.sourceOrdonnance = sourceOrdonnance;
    }

    public LocalDate getDateOrdonnance() {
        return dateOrdonnance;
    }

    public void setDateOrdonnance(LocalDate dateOrdonnance) {
        this.dateOrdonnance = dateOrdonnance;
    }

    public LocalDate getDateRdv() {
        return dateRdv;
    }

    public void setDateRdv(LocalDate dateRdv) {
        this.dateRdv = dateRdv;
    }

    public Integer getDureeTraitement() {
        return dureeTraitement;
    }

    public void setDureeTraitement(Integer dureeTraitement) {
        this.dureeTraitement = dureeTraitement;
    }

    public List<MedicamentOrdonnance> getMedicaments() {
        return medicaments;
    }

    public void setMedicaments(List<MedicamentOrdonnance> medicaments) {
        this.medicaments = medicaments;
    }
}