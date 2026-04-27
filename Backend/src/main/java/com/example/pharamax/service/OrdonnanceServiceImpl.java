package com.example.pharamax.service;


import com.example.pharamax.dto.MedicamentOrdonnanceRequestDTO;
import com.example.pharamax.dto.OrdonnanceListDTO;
import com.example.pharamax.dto.OrdonnanceRequestDTO;
import com.example.pharamax.model.MedicamentOrdonnance;
import com.example.pharamax.model.MedicamentStock;
import com.example.pharamax.model.Ordonnance;
import com.example.pharamax.model.Patient;
import com.example.pharamax.repository.MedicamentStockRepository;
import com.example.pharamax.repository.OrdonnanceRepository;
import com.example.pharamax.repository.PatientRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrdonnanceServiceImpl implements OrdonnanceService {

    private final PatientRepository patientRepository;
    private final MedicamentStockRepository medicamentStockRepository;
    private final OrdonnanceRepository ordonnanceRepository;

    public OrdonnanceServiceImpl(PatientRepository patientRepository,
                                 MedicamentStockRepository medicamentStockRepository,
                                 OrdonnanceRepository ordonnanceRepository) {
        this.patientRepository = patientRepository;
        this.medicamentStockRepository = medicamentStockRepository;
        this.ordonnanceRepository = ordonnanceRepository;
    }

    @Override
    public Ordonnance createOrdonnance(OrdonnanceRequestDTO dto) {

        Patient patient = patientRepository.findById(dto.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient introuvable"));

        Ordonnance ordonnance = new Ordonnance();
        ordonnance.setPatient(patient);
        ordonnance.setSourceOrdonnance(dto.getSourceOrdonnance());
        ordonnance.setDateOrdonnance(dto.getDateOrdonnance());
        ordonnance.setDateRdv(dto.getDateRdv());
        ordonnance.setDureeTraitement(dto.getDureeTraitement());

        List<MedicamentOrdonnance> medicamentList = new ArrayList<>();

        for (MedicamentOrdonnanceRequestDTO medDto : dto.getMedicaments()) {

            MedicamentOrdonnance medOrd = new MedicamentOrdonnance();
            medOrd.setOrdonnance(ordonnance);
            medOrd.setPosologie(medDto.getPosologie());

            if (medDto.getMedicamentStockId() != null) {

                MedicamentStock stock = medicamentStockRepository
                        .findById(medDto.getMedicamentStockId())
                        .orElseThrow(() -> new RuntimeException("Médicament stock introuvable"));

                medOrd.setMedicamentStock(stock);

            } else {
                medOrd.setNomManuel(medDto.getNomManuel());
            }

            medicamentList.add(medOrd);
        }

        ordonnance.setMedicaments(medicamentList);

        return ordonnanceRepository.save(ordonnance);
    }

    @Override
    public Ordonnance getOrdonnanceById(Long id) {
        return ordonnanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ordonnance introuvable"));
    }
    @Override
    public List<OrdonnanceListDTO> getOrdonnancesByPatientId(Long patientId) {

        List<Ordonnance> ordonnances = ordonnanceRepository.findByPatientId(patientId);

        return ordonnances.stream().map(o -> {

            OrdonnanceListDTO dto = new OrdonnanceListDTO();

            dto.setId(o.getId());
            dto.setDateOrdonnance(o.getDateOrdonnance());
            dto.setDateRdv(o.getDateRdv());
            dto.setDureeTraitement(o.getDureeTraitement());
            dto.setSourceOrdonnance(o.getSourceOrdonnance());

            dto.setNombreMedicaments(
                    o.getMedicaments() != null ? o.getMedicaments().size() : 0
            );

            return dto;

        }).toList();
    }

}