package com.example.pharamax.dto;

import java.time.LocalDate;
import java.util.List;

public class SessionResponseDTO {

    private Long id;
    private LocalDate dateSession;
    private LocalDate dateProchainRdv;
    private Integer joursDistribution;
    private String statut;

    private List<DistributionDTO> distributions;

    // Getters / Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getDateSession() { return dateSession; }
    public void setDateSession(LocalDate dateSession) { this.dateSession = dateSession; }

    public LocalDate getDateProchainRdv() { return dateProchainRdv; }
    public void setDateProchainRdv(LocalDate dateProchainRdv) { this.dateProchainRdv = dateProchainRdv; }

    public Integer getJoursDistribution() { return joursDistribution; }
    public void setJoursDistribution(Integer joursDistribution) { this.joursDistribution = joursDistribution; }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public List<DistributionDTO> getDistributions() { return distributions; }
    public void setDistributions(List<DistributionDTO> distributions) { this.distributions = distributions; }
}