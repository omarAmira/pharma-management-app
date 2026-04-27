package com.example.pharamax.dto;

public class DistributionRequestDTO {

    private Long medicamentStockId; // optionnel
    private Integer quantite;

    // getters / setters

    public Long getMedicamentStockId() {
        return medicamentStockId;
    }

    public void setMedicamentStockId(Long medicamentStockId) {
        this.medicamentStockId = medicamentStockId;
    }



    public Integer getQuantite() {
        return quantite;
    }

    public void setQuantite(Integer quantite) {
        this.quantite = quantite;
    }
}