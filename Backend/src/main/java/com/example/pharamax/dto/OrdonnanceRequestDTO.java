package com.example.pharamax.dto;

import java.time.LocalDate;
import java.util.List;

public class OrdonnanceRequestDTO {
    private Long patientId;

    private String sourceOrdonnance;
    private LocalDate dateOrdonnance;
    private LocalDate dateRdv;
    private Integer dureeTraitement;

    private List<MedicamentOrdonnanceRequestDTO> medicaments;

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
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

    public List<MedicamentOrdonnanceRequestDTO> getMedicaments() {
        return medicaments;
    }

    public void setMedicaments(List<MedicamentOrdonnanceRequestDTO> medicaments) {
        this.medicaments = medicaments;
    }
}
