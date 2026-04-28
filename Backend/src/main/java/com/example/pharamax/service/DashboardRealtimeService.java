package com.example.pharamax.service;

import com.example.pharamax.dto.StatJourDTO;
import com.example.pharamax.repository.SessionTraitementRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class DashboardRealtimeService {

    private final SimpMessagingTemplate messagingTemplate;
    private final   SessionTraitementRepository sessionRepository;
    public DashboardRealtimeService(SimpMessagingTemplate messagingTemplate, SessionTraitementRepository sessionRepository) {
        this.messagingTemplate = messagingTemplate;
        this.sessionRepository = sessionRepository;
    }

    public void notifyDashboard() {


        List<StatJourDTO> stats = sessionRepository.countPatientsByDay()
                .stream()
                .map(obj -> {
                    StatJourDTO dto = new StatJourDTO();
                    dto.setDate((LocalDate) obj[0]);
                    dto.setNombrePatients((Long) obj[1]);
                    return dto;
                })
                .toList();

        messagingTemplate.convertAndSend(
                "/topic/dashboard",
                stats
        );
    }
}