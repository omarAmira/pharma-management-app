package com.example.pharamax.repository;

import com.example.pharamax.model.MedicamentStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicamentStockRepository extends JpaRepository<MedicamentStock, Long> {}
