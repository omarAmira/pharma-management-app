package com.example.pharamax.dto;

public class MedicamentOrdonnanceRequestDTO {
    private Long medicamentStockId; // null si hors stock
    private String nomManuel;       // utilisé si hors stock
    private Integer posologie;      // nombre de comprimés par jour

    public Long getMedicamentStockId() {
        return medicamentStockId;
    }

    public void setMedicamentStockId(Long medicamentStockId) {
        this.medicamentStockId = medicamentStockId;
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
}
