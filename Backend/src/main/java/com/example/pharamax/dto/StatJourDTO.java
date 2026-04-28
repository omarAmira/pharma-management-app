package com.example.pharamax.dto;

import java.time.LocalDate;

public class StatJourDTO {
    private LocalDate date;
    private Long nombrePatients;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getNombrePatients() {
        return nombrePatients;
    }

    public void setNombrePatients(Long nombrePatients) {
        this.nombrePatients = nombrePatients;
    }
}