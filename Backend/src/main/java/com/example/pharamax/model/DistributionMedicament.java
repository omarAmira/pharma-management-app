package com.example.pharamax.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class DistributionMedicament {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    private SessionTraitement session;

    // 🔥 NOUVEAU (obligatoire)
    @ManyToOne(optional = false)
    private MedicamentStock medicamentStock;

    // 🔹 optionnel (si existe dans ordonnance)
    @ManyToOne
    private MedicamentOrdonnance medicamentOrdonnance;

    private Integer quantiteDonnee;
    // getters / setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SessionTraitement getSession() {
        return session;
    }

    public void setSession(SessionTraitement session) {
        this.session = session;
    }

    public MedicamentOrdonnance getMedicamentOrdonnance() {
        return medicamentOrdonnance;
    }

    public void setMedicamentOrdonnance(MedicamentOrdonnance medicamentOrdonnance) {
        this.medicamentOrdonnance = medicamentOrdonnance;
    }

    public Integer getQuantiteDonnee() {
        return quantiteDonnee;
    }

    public void setQuantiteDonnee(Integer quantiteDonnee) {
        this.quantiteDonnee = quantiteDonnee;
    }

    public MedicamentStock getMedicamentStock() {
        return medicamentStock;
    }

    public void setMedicamentStock(MedicamentStock medicamentStock) {
        this.medicamentStock = medicamentStock;
    }
}