package com.example.pharamax.controller;

import com.example.pharamax.dto.PatientArriveDTO;
import com.example.pharamax.dto.StatJourDTO;
import com.example.pharamax.service.SessionServiceImplTest;
import com.example.pharamax.service.SessionServiceTest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final SessionServiceImplTest sessionService;

    public DashboardController(SessionServiceTest service, SessionServiceImplTest sessionService) {
        this.sessionService = sessionService;
    }

    @GetMapping("/stats-par-jour")
    public List<StatJourDTO> getStats() {
        return sessionService.getPatientsParJour();
    }

    @GetMapping("/patients-par-date")
    public List<PatientArriveDTO> getPatientsByDate(@RequestParam String date) {
        return sessionService.getPatientsParDate(LocalDate.parse(date));
    }
}