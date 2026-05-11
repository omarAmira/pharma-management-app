package com.example.pharamax.service;

import com.example.pharamax.model.ActionType;
import com.example.pharamax.model.MedicamentStock;
import com.example.pharamax.model.StockAuditLog;
import com.example.pharamax.repository.MedicamentStockRepository;
import com.example.pharamax.repository.StockAuditLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MedicamentStockService {

    private final MedicamentStockRepository stockRepository;
    private final StockAuditLogRepository auditRepository;   // ← Ajout
    public MedicamentStockService(MedicamentStockRepository stockRepository,
                                  StockAuditLogRepository auditRepository) {
        this.stockRepository = stockRepository;
        this.auditRepository = auditRepository;
    }

    public List<MedicamentStock> getAllMedicamentsStock() {
        return stockRepository.findAll();
    }
    public MedicamentStock addMedicamentStock(MedicamentStock medicament) {
        MedicamentStock saved = stockRepository.save(medicament);

        // Traçabilité
        StockAuditLog log = new StockAuditLog();
        log.setMedicamentId(saved.getId());
        log.setNomMedicament(saved.getNom());
        log.setAction(ActionType.ADD);
        log.setDateAction(LocalDateTime.now());
        log.setDetails("Ajout - Quantité: " + saved.getQuantiteStock() +
                ", Seuil: " + saved.getSeuil() + ", Unité: " + saved.getUnite());

        auditRepository.save(log);
        return saved;
    }

    public MedicamentStock updateMedicamentStock(Long id, MedicamentStock updated) {

        MedicamentStock existing = stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicament not found"));

        // Log avant modification
        StockAuditLog log = new StockAuditLog();
        log.setMedicamentId(id);
        log.setNomMedicament(existing.getNom());
        log.setAction(ActionType.UPDATE);
        log.setDateAction(LocalDateTime.now());
        log.setDetails("Avant → Après | Stock: " + existing.getQuantiteStock() + " → " +
                updated.getQuantiteStock() +
                " | Seuil: " + existing.getSeuil() + " → " + updated.getSeuil());

        // Mise à jour
        existing.setNom(updated.getNom());
        existing.setQuantiteStock(updated.getQuantiteStock());
        existing.setSeuil(updated.getSeuil());
        existing.setUnite(updated.getUnite());
        existing.setDatePeremption(updated.getDatePeremption());

        MedicamentStock saved = stockRepository.save(existing);
        auditRepository.save(log);

        return saved;
    }

    // Ajoute cette méthode pour la suppression
    public void deleteMedicamentStock(Long id) {
        MedicamentStock med = stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicament not found"));

        StockAuditLog log = new StockAuditLog();
        log.setMedicamentId(id);
        log.setNomMedicament(med.getNom());
        log.setAction(ActionType.DELETE);
        log.setDateAction(LocalDateTime.now());
        log.setDetails("Suppression - Stock final: " + med.getQuantiteStock());

        stockRepository.deleteById(id);
        auditRepository.save(log);
    }

}