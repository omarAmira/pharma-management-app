package com.example.pharamax.dto;

import java.time.LocalDate;

public class OrdonnanceListDTO {

    private Long id;
    private LocalDate dateOrdonnance;
    private LocalDate dateRdv;
    private Integer dureeTraitement;
    private String sourceOrdonnance;

    private Integer nombreMedicaments;
    private String patientNom;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getSourceOrdonnance() {
        return sourceOrdonnance;
    }

    public void setSourceOrdonnance(String sourceOrdonnance) {
        this.sourceOrdonnance = sourceOrdonnance;
    }

    public Integer getNombreMedicaments() {
        return nombreMedicaments;
    }

    public void setNombreMedicaments(Integer nombreMedicaments) {
        this.nombreMedicaments = nombreMedicaments;
    }

    public String getPatientNom() {
        return patientNom;
    }

    public void setPatientNom(String patientNom) {
        this.patientNom = patientNom;
    }
}