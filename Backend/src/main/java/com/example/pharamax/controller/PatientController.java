package com.example.pharamax.controller;

import com.example.pharamax.model.Patient;
import com.example.pharamax.repository.PatientRepository;
import com.example.pharamax.service.PatientService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/patients")
public class PatientController {

    private final PatientService patientService;
    private final PatientRepository patientRepository;

    public PatientController(PatientService patientService, PatientRepository patientRepository) {
        this.patientService = patientService;
        this.patientRepository = patientRepository;
    }

    @PostMapping
    public Patient addPatient(@RequestBody Patient patient) {
        return patientService.addPatient(patient);
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/scan")
    public ResponseEntity<?> scanQr(@RequestParam String code) {
        try {
            Long patientId = Long.valueOf(code); // le QR code contient juste l'ID
            Patient patient = patientRepository.findById(patientId)
                    .orElseThrow(() -> new RuntimeException("Patient introuvable"));

            // 🔹 Audit simple : log du scan
            System.out.println("Scan effectué pour patient ID=" + patientId + " à " + LocalDateTime.now());

            return ResponseEntity.ok(patient);
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body("QR code invalide");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getPatientById(@PathVariable Long id) {
        Optional<Patient> patientOpt = patientRepository.findById(id);

        if (patientOpt.isPresent()) {
            return ResponseEntity.ok(patientOpt.get()); // renvoie Patient
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Patient introuvable"); // renvoie String
        }
    }


}