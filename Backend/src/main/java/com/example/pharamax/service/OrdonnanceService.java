package com.example.pharamax.service;

import com.example.pharamax.dto.OrdonnanceListDTO;
import com.example.pharamax.dto.OrdonnanceRequestDTO;
import com.example.pharamax.model.Ordonnance;

import java.util.List;

public interface OrdonnanceService {
    Ordonnance createOrdonnance(OrdonnanceRequestDTO dto);
    Ordonnance getOrdonnanceById(Long id);
    List<OrdonnanceListDTO> getOrdonnancesByPatientId(Long patientId);
    Ordonnance updateOrdonnance(Long id, OrdonnanceRequestDTO dto);   // ← Ajout
    List<Ordonnance> getAllOrdonnances();                    // ← Changé
    List<Ordonnance> getOrdonnancesByPatientIdFull(Long patientId);  // ← Nouveau nom
}