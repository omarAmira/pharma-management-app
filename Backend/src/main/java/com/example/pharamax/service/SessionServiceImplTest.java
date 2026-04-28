package com.example.pharamax.service;

import com.example.pharamax.dto.*;

import com.example.pharamax.model.*;
import com.example.pharamax.repository.MedicamentOrdonnanceRepository;
import com.example.pharamax.repository.MedicamentStockRepository;
import com.example.pharamax.repository.OrdonnanceRepository;
import com.example.pharamax.repository.SessionTraitementRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class SessionServiceImplTest implements SessionServiceTest {





    private final OrdonnanceRepository ordonnanceRepository;
    private final MedicamentOrdonnanceRepository medicamentOrdonnanceRepository;

    private final SessionTraitementRepository sessionRepository;
    private final MedicamentStockRepository medicamentStockRepository;

    public SessionServiceImplTest(OrdonnanceRepository ordonnanceRepository,
                                  MedicamentOrdonnanceRepository medicamentOrdonnanceRepository, SessionTraitementRepository sessionRepository,
                                  MedicamentStockRepository medicamentStockRepository) {
        this.ordonnanceRepository = ordonnanceRepository;
        this.medicamentOrdonnanceRepository = medicamentOrdonnanceRepository;
        this.sessionRepository = sessionRepository;
        this.medicamentStockRepository = medicamentStockRepository;
    }

    @Override
    public SessionResponseDTO creerPremiereSession(Long ordonnanceId,
                                                   Integer joursDistribution) {

        Ordonnance ordonnance = ordonnanceRepository.findById(ordonnanceId)
                .orElseThrow(() -> new RuntimeException("Ordonnance introuvable"));

        SessionTraitement session = new SessionTraitement();
        session.setOrdonnance(ordonnance);
        session.setDateSession(ordonnance.getDateRdv());
        session.setJoursDistribution(joursDistribution);
        session.setDateProchainRdv(
                ordonnance.getDateRdv().plusDays(joursDistribution));
        session.setStatut(StatutSession.EN_ATTENTE);

        genererDistribution(session);

        return mapToDTO(sessionRepository.save(session));
    }

    @Override
    public String traiterArriveePatient(Long ordonnanceId) {

        SessionTraitement derniere =
                sessionRepository.findTopByOrdonnanceIdOrderByDateSessionDesc(ordonnanceId)
                        .orElseThrow(() -> new RuntimeException("Aucune session trouvée"));

        LocalDate today = LocalDate.now();

        // Vérifier si le traitement est terminé
        Ordonnance ordonnance = derniere.getOrdonnance();
        LocalDate dateFin = ordonnance.getDateOrdonnance()
                .plusMonths(ordonnance.getDureeTraitement());

        if (!today.isBefore(dateFin)) {
            derniere.setStatut(StatutSession.TERMINEE);
            sessionRepository.save(derniere);
            return "Traitement terminé";
        }

        // Vérifier l'état d'arrivée
        if (today.isBefore(derniere.getDateProchainRdv())) {
            long joursAvance = ChronoUnit.DAYS.between(today, derniere.getDateProchainRdv());
            derniere.setStatut(StatutSession.EN_ATTENTE);
            sessionRepository.save(derniere);
            return "Patient arrivé en avance de " + joursAvance + " jour(s)";
        } else if (today.isEqual(derniere.getDateProchainRdv())) {
            derniere.setStatut(StatutSession.EFFECTUEE);
            sessionRepository.save(derniere);
            return "Patient arrivé à l'heure";
        } else {
            long joursRetard = ChronoUnit.DAYS.between(derniere.getDateProchainRdv(), today);
            derniere.setStatut(StatutSession.EN_RETARD);
            sessionRepository.save(derniere);
            return "Patient arrivé en retard de " + joursRetard + " jour(s)";
        }
    }

    @Override
    public List<SessionResponseDTO> getSessionsByOrdonnance(Long ordonnanceId) {
        return sessionRepository.findByOrdonnanceId(ordonnanceId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    private void genererDistribution(SessionTraitement session) {

        for (MedicamentOrdonnance med : session.getOrdonnance().getMedicaments()) {

            int quantite = med.getPosologie() * session.getJoursDistribution();

            DistributionMedicament dist = new DistributionMedicament();
            dist.setSession(session);
            dist.setMedicamentOrdonnance(med);
            dist.setMedicamentStock(med.getMedicamentStock());
            dist.setQuantiteDonnee(quantite);

            session.getDistributions().add(dist);

            // 🔽 DECREMENTATION DU STOCK
            MedicamentStock stock = med.getMedicamentStock();

            if (stock != null) {

                Integer quantiteStock = stock.getQuantiteStock();

                if (quantiteStock == null) {
                    quantiteStock = 0;
                }

                if (quantiteStock < quantite) {
                    throw new RuntimeException(
                            "Stock insuffisant pour le médicament : " + stock.getNom()
                    );
                }

                stock.setQuantiteStock(quantiteStock - quantite);

                medicamentStockRepository.save(stock);
            }
        }
    }
    private SessionResponseDTO mapToDTO(SessionTraitement session) {

        SessionResponseDTO dto = new SessionResponseDTO();
        dto.setId(session.getId());
        dto.setDateSession(session.getDateSession());
        dto.setDateProchainRdv(session.getDateProchainRdv());
        dto.setJoursDistribution(session.getJoursDistribution());
        dto.setStatut(session.getStatut().name());

        List<DistributionDTO> distDTOs = session.getDistributions().stream()
                .map(d -> {
                    DistributionDTO distDTO = new DistributionDTO();

                    // 🔥 SAFE CHECK
                    if (d.getMedicamentOrdonnance() != null &&
                            d.getMedicamentOrdonnance().getMedicamentStock() != null) {

                        distDTO.setNomMedicament(
                                d.getMedicamentOrdonnance()
                                        .getMedicamentStock().getNom());

                    } else {
                        // 🔥 fallback → stock direct
                        distDTO.setNomMedicament(
                                d.getMedicamentStock().getNom());
                    }

                    distDTO.setQuantiteDonnee(d.getQuantiteDonnee());
                    return distDTO;
                }).toList();

        dto.setDistributions(distDTOs);

        return dto;
    }




    //nouvelle fonctionnaliteé :


    public SessionResponseDTO creerSessionManuelle(SessionRequestDTO request) {

        Ordonnance ordonnance = ordonnanceRepository.findById(request.getOrdonnanceId())
                .orElseThrow(() -> new RuntimeException("Ordonnance introuvable"));

        SessionTraitement session = new SessionTraitement();
        session.setOrdonnance(ordonnance);
        session.setDateSession(LocalDate.now());
        session.setJoursDistribution(request.getJoursDistribution());
        session.setDateProchainRdv(request.getDateProchainRdv());
        session.setStatut(StatutSession.EFFECTUEE);

        for (DistributionRequestDTO d : request.getDistributions()) {

            if (d.getMedicamentStockId() == null) {
                throw new RuntimeException("Le médicament doit exister dans le stock");
            }

            MedicamentStock stock = medicamentStockRepository.findById(d.getMedicamentStockId())
                    .orElseThrow(() -> new RuntimeException("Stock introuvable"));

            if (stock.getQuantiteStock() < d.getQuantite()) {
                throw new RuntimeException("Stock insuffisant pour " + stock.getNom());
            }

            // 🔥 Décrémentation stock
            stock.setQuantiteStock(stock.getQuantiteStock() - d.getQuantite());
            medicamentStockRepository.save(stock);

            DistributionMedicament dist = new DistributionMedicament();
            dist.setSession(session);
            dist.setMedicamentStock(stock);
            dist.setQuantiteDonnee(d.getQuantite());

            // 🔍 vérifier si dans ordonnance
            Optional<MedicamentOrdonnance> medOrdOpt =
                    ordonnance.getMedicaments().stream()
                            .filter(m -> m.getMedicamentStock() != null &&
                                    m.getMedicamentStock().getId().equals(stock.getId()))
                            .findFirst();

            medOrdOpt.ifPresent(dist::setMedicamentOrdonnance);

            session.getDistributions().add(dist);
        }

        return mapToDTO(sessionRepository.save(session));
    }


    public List<StatJourDTO> getPatientsParJour() {

        return sessionRepository.countPatientsByDay()
                .stream()
                .map(obj -> {
                    StatJourDTO dto = new StatJourDTO();
                    dto.setDate((LocalDate) obj[0]);
                    dto.setNombrePatients((Long) obj[1]);
                    return dto;
                })
                .toList();
    }

    public List<PatientArriveDTO> getPatientsParDate(LocalDate date) {

        return sessionRepository.findByDateProchainRdv(date)
                .stream()
                .map(s -> {
                    PatientArriveDTO dto = new PatientArriveDTO();

                    dto.setNom(s.getOrdonnance().getPatient().getNom());
                    dto.setPrenom(s.getOrdonnance().getPatient().getPrenom());
                    dto.setDateRdv(s.getDateProchainRdv());
                    dto.setStatut(s.getStatut().name());

                    return dto;
                })
                .toList();
    }
}