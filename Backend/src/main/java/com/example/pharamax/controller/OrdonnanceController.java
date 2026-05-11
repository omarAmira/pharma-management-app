package com.example.pharamax.controller;

import com.example.pharamax.dto.OrdonnanceListDTO;
import com.example.pharamax.dto.OrdonnanceRequestDTO;
import com.example.pharamax.model.Ordonnance;
import com.example.pharamax.service.OrdonnanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ordonnances")
public class OrdonnanceController {

    private final OrdonnanceService ordonnanceService;

    public OrdonnanceController(OrdonnanceService ordonnanceService) {
        this.ordonnanceService = ordonnanceService;
    }

    @PostMapping
    public ResponseEntity<Ordonnance> createOrdonnance(
            @RequestBody OrdonnanceRequestDTO dto) {

        Ordonnance ordonnance = ordonnanceService.createOrdonnance(dto);

        return ResponseEntity.ok(ordonnance);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Ordonnance> updateOrdonnance(
            @PathVariable Long id,
            @RequestBody OrdonnanceRequestDTO dto) {

        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        Ordonnance ordonnance = ordonnanceService.updateOrdonnance(id, dto);
        return ResponseEntity.ok(ordonnance);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Ordonnance> getOrdonnance(@PathVariable Long id) {
        Ordonnance ordonnance = ordonnanceService.getOrdonnanceById(id);
        return ResponseEntity.ok(ordonnance);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<OrdonnanceListDTO>> getByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(ordonnanceService.getOrdonnancesByPatientId(patientId));
    }
    @GetMapping
    public ResponseEntity<List<Ordonnance>> getAllOrdonnances() {   // ← Changé
        return ResponseEntity.ok(ordonnanceService.getAllOrdonnances());
    }

}