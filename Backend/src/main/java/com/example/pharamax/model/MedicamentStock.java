package com.example.pharamax.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class MedicamentStock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private Integer quantiteStock; // utilisation d'Integer pour accepter null

    private Integer seuil;

    @Enumerated(EnumType.STRING)
    private Unite unite; // unité du médicament

    private LocalDate datePeremption; // date de péremption

    // Getters / Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public Integer getQuantiteStock() { return quantiteStock; }
    public void setQuantiteStock(Integer quantite) { this.quantiteStock = quantite; }

    public Integer getSeuil() { return seuil; }
    public void setSeuil(Integer seuil) { this.seuil = seuil; }

    public Unite getUnite() { return unite; }
    public void setUnite(Unite unite) { this.unite = unite; }

    public LocalDate getDatePeremption() { return datePeremption; }
    public void setDatePeremption(LocalDate datePeremption) { this.datePeremption = datePeremption; }
}
