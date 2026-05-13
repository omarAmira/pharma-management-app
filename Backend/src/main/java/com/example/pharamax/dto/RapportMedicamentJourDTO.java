package com.example.pharamax.dto;

import java.time.LocalDate;

public class RapportMedicamentJourDTO {

    private LocalDate date;
    private String medicament;
    private Long quantiteTotale;

    public RapportMedicamentJourDTO() {
    }

    public RapportMedicamentJourDTO(LocalDate date, String medicament, Long quantiteTotale) {
        this.date = date;
        this.medicament = medicament;
        this.quantiteTotale = quantiteTotale;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getMedicament() {
        return medicament;
    }

    public void setMedicament(String medicament) {
        this.medicament = medicament;
    }

    public Long getQuantiteTotale() {
        return quantiteTotale;
    }

    public void setQuantiteTotale(Long quantiteTotale) {
        this.quantiteTotale = quantiteTotale;
    }
}