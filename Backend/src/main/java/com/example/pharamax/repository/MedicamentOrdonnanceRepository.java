package com.example.pharamax.repository;

import com.example.pharamax.model.MedicamentOrdonnance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicamentOrdonnanceRepository extends JpaRepository<MedicamentOrdonnance, Long> {}
