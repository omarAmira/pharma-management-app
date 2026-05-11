package com.example.pharamax.controller;

import com.example.pharamax.model.MedicamentStock;
import com.example.pharamax.model.StockAuditLog;
import com.example.pharamax.service.MedicamentStockService;
import com.example.pharamax.service.StockAuditService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicaments-stock")
public class MedicamentStockController {

    private final MedicamentStockService stockService;

    private final StockAuditService auditService;

    public MedicamentStockController(MedicamentStockService stockService, StockAuditService auditService) {
        this.stockService = stockService;
        this.auditService = auditService;
    }

    @PostMapping
    public MedicamentStock addMedicamentStock(@RequestBody MedicamentStock medicamentStock) {
        return stockService.addMedicamentStock(medicamentStock);
    }

    @GetMapping
    public List<MedicamentStock> getAllMedicamentsStock() {
        return stockService.getAllMedicamentsStock();
    }

    @PutMapping("/{id}")
    public MedicamentStock updateMedicamentStock(
            @PathVariable Long id,
            @RequestBody MedicamentStock medicamentStock
    ) {
        return stockService.updateMedicamentStock(id, medicamentStock);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicamentStock(@PathVariable Long id) {
        stockService.deleteMedicamentStock(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/historique")
    public List<StockAuditLog> getHistorique() {
        return auditService.getAllLogs();   // On va créer ce service
    }
}