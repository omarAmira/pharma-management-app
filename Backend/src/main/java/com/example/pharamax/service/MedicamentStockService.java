package com.example.pharamax.service;

import com.example.pharamax.model.MedicamentStock;
import com.example.pharamax.repository.MedicamentStockRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicamentStockService {

    private final MedicamentStockRepository stockRepository;

    public MedicamentStockService(MedicamentStockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public MedicamentStock addMedicamentStock(MedicamentStock medicament) {
        return stockRepository.save(medicament);
    }

    public List<MedicamentStock> getAllMedicamentsStock() {
        return stockRepository.findAll();
    }
    public MedicamentStock updateMedicamentStock(Long id, MedicamentStock updatedMedicament) {

        MedicamentStock existing = stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicament not found"));

        existing.setNom(updatedMedicament.getNom());
        existing.setQuantiteStock(updatedMedicament.getQuantiteStock());
        existing.setSeuil(updatedMedicament.getSeuil());
        existing.setUnite(updatedMedicament.getUnite());
        existing.setDatePeremption(updatedMedicament.getDatePeremption());

        return stockRepository.save(existing);
    }

}