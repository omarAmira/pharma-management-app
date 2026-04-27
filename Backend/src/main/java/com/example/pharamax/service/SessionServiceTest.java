package com.example.pharamax.service;

import com.example.pharamax.dto.SessionResponseDTO;

import java.util.List;

public interface SessionServiceTest {

    SessionResponseDTO creerPremiereSession(Long ordonnanceId, Integer joursDistribution);

    String traiterArriveePatient(Long ordonnanceId);

    List<SessionResponseDTO> getSessionsByOrdonnance(Long ordonnanceId);
}
