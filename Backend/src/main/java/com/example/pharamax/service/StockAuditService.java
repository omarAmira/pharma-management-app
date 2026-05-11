package com.example.pharamax.service;

import com.example.pharamax.model.StockAuditLog;
import com.example.pharamax.repository.StockAuditLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockAuditService {

    private final StockAuditLogRepository auditRepository;

    public StockAuditService(StockAuditLogRepository auditRepository) {
        this.auditRepository = auditRepository;
    }

    public List<StockAuditLog> getAllLogs() {
        return auditRepository.findAllByOrderByDateActionDesc();
    }

    public List<StockAuditLog> getLogsByMedicamentId(Long medicamentId) {
        return auditRepository.findByMedicamentIdOrderByDateActionDesc(medicamentId);
    }
}