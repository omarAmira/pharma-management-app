package com.example.pharamax.controller;

import com.example.pharamax.model.MedicamentStock;
import com.example.pharamax.service.MedicamentStockService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/medicaments-stock")
public class MedicamentStockController {

    private final MedicamentStockService stockService;

    public MedicamentStockController(MedicamentStockService stockService) {
        this.stockService = stockService;
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
}