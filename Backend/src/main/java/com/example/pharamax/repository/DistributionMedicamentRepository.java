package com.example.pharamax.repository;

import com.example.pharamax.model.DistributionMedicament;
import com.example.pharamax.model.MedicamentStock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DistributionMedicamentRepository extends JpaRepository<DistributionMedicament, Long> {}
