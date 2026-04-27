package com.example.pharamax.dto;

import java.time.LocalDate;
import java.util.List;

public class SessionRequestDTO {

    private Long ordonnanceId;
    private Integer joursDistribution;
    private LocalDate dateProchainRdv;

    private List<DistributionRequestDTO> distributions;

    // getters / setters

    public Long getOrdonnanceId() {
        return ordonnanceId;
    }

    public void setOrdonnanceId(Long ordonnanceId) {
        this.ordonnanceId = ordonnanceId;
    }

    public Integer getJoursDistribution() {
        return joursDistribution;
    }

    public void setJoursDistribution(Integer joursDistribution) {
        this.joursDistribution = joursDistribution;
    }

    public LocalDate getDateProchainRdv() {
        return dateProchainRdv;
    }

    public void setDateProchainRdv(LocalDate dateProchainRdv) {
        this.dateProchainRdv = dateProchainRdv;
    }

    public List<DistributionRequestDTO> getDistributions() {
        return distributions;
    }

    public void setDistributions(List<DistributionRequestDTO> distributions) {
        this.distributions = distributions;
    }
}