package com.example.pharamax.repository;

import com.example.pharamax.model.StockAuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockAuditLogRepository extends JpaRepository<StockAuditLog, Long> {
    List<StockAuditLog> findAllByOrderByDateActionDesc();
    List<StockAuditLog> findByMedicamentIdOrderByDateActionDesc(Long medicamentId);
}