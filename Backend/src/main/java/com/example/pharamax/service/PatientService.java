package com.example.pharamax.service;

import com.example.pharamax.config.QrCodeGenerator;
import com.example.pharamax.model.Patient;
import com.example.pharamax.repository.PatientRepository;
import org.springframework.stereotype.Service;
import java.util.List;

import com.google.zxing.WriterException;
import java.io.IOException;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient addPatient(Patient patient) {
        // Étape 1 : sauvegarder pour obtenir l'ID
        patient = patientRepository.save(patient);

        try {
            // Étape 2 : générer QR code avec l'ID
            String qrBase64 = QrCodeGenerator.generateQrCodeBase64(patient.getId(), 250, 250);

            // Étape 3 : mettre à jour le champ qrCode
            patient.setQrCode(qrBase64);

            // Étape 4 : sauvegarder à nouveau avec le QR code
            patient = patientRepository.save(patient);
        } catch (WriterException | IOException e) {
            throw new RuntimeException("Erreur génération QR code", e);
        }

        return patient;
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    public Optional<Patient> getPatientById (Long id){
        return patientRepository.findById(id);
    }
}
