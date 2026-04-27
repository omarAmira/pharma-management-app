package com.example.pharamax.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
public class SessionTraitement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Ordonnance ordonnance;

    private LocalDate dateSession;
    private LocalDate dateProchainRdv;

    private Integer joursDistribution;

    @Enumerated(EnumType.STRING)
    private StatutSession statut;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<DistributionMedicament> distributions = new ArrayList<>();

    // getters / setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ordonnance getOrdonnance() {
        return ordonnance;
    }

    public void setOrdonnance(Ordonnance ordonnance) {
        this.ordonnance = ordonnance;
    }

    public LocalDate getDateSession() {
        return dateSession;
    }

    public void setDateSession(LocalDate dateSession) {
        this.dateSession = dateSession;
    }

    public LocalDate getDateProchainRdv() {
        return dateProchainRdv;
    }

    public void setDateProchainRdv(LocalDate dateProchainRdv) {
        this.dateProchainRdv = dateProchainRdv;
    }

    public Integer getJoursDistribution() {
        return joursDistribution;
    }

    public void setJoursDistribution(Integer joursDistribution) {
        this.joursDistribution = joursDistribution;
    }

    public StatutSession getStatut() {
        return statut;
    }

    public void setStatut(StatutSession statut) {
        this.statut = statut;
    }

    public List<DistributionMedicament> getDistributions() {
        return distributions;
    }

    public void setDistributions(List<DistributionMedicament> distributions) {
        this.distributions = distributions;
    }


}