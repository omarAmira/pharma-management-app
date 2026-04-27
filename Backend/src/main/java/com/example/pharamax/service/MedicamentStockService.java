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
}