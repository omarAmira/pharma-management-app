package com.example.pharamax.controller;

import com.example.pharamax.dto.SessionRequestDTO;
import com.example.pharamax.dto.SessionResponseDTO;
import com.example.pharamax.service.SessionServiceImplTest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionServiceImplTest sessionService;

    public SessionController(SessionServiceImplTest sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/creer/{ordonnanceId}")
    public ResponseEntity<SessionResponseDTO> creerPremiereSession(
            @PathVariable Long ordonnanceId,
            @RequestParam Integer joursDistribution) {

        return ResponseEntity.ok(
                sessionService.creerPremiereSession(ordonnanceId, joursDistribution));
    }

    @PostMapping("/arrivee/{ordonnanceId}")
    public ResponseEntity<Map<String, String>> traiterArrivee(@PathVariable Long ordonnanceId) {
        String message = sessionService.traiterArriveePatient(ordonnanceId);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/ordonnance/{ordonnanceId}")
    public ResponseEntity<List<SessionResponseDTO>> getSessions(
            @PathVariable Long ordonnanceId) {

        return ResponseEntity.ok(
                sessionService.getSessionsByOrdonnance(ordonnanceId));
    }


    //Nouvelle Fonctionnalité :
    @PostMapping("/manuel")
    public ResponseEntity<SessionResponseDTO> creerSessionManuelle(
            @RequestBody SessionRequestDTO request) {

        return ResponseEntity.ok(
                sessionService.creerSessionManuelle(request));
    }


    @DeleteMapping("/{sessionId}/annuler")
    public ResponseEntity<Map<String, String>> annulerSession(@PathVariable Long sessionId) {
        sessionService.annulerSession(sessionId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Session annulée et stock corrigé");
        return ResponseEntity.ok(response);
    }
}