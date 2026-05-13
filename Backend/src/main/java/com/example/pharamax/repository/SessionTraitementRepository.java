package com.example.pharamax.repository;

import com.example.pharamax.model.SessionTraitement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface SessionTraitementRepository extends JpaRepository<SessionTraitement, Long> {
    Optional<SessionTraitement> findTopByOrdonnanceIdOrderByDateSessionDesc(Long ordonnanceId);

    List<SessionTraitement> findByOrdonnanceId(Long ordonnanceId);
    @Query("""
                SELECT s.dateProchainRdv, COUNT(s)
                FROM SessionTraitement s
                GROUP BY s.dateProchainRdv
                ORDER BY s.dateProchainRdv
                """)
    List<Object[]> countPatientsByDay();

    List<SessionTraitement> findByDateProchainRdv(LocalDate date);
    List<SessionTraitement> findByDateProchainRdvBetween(LocalDate start, LocalDate end);




    @Query("""
    SELECT 
        s.dateSession,
        d.medicamentStock.nom,
        SUM(d.quantiteDonnee)
    FROM DistributionMedicament d
    JOIN d.session s
    WHERE s.dateSession BETWEEN :debut AND :fin
    GROUP BY s.dateSession, d.medicamentStock.nom
    ORDER BY s.dateSession ASC
""")
    List<Object[]> getRapportMedicamentsEntreDeuxDates(
            @Param("debut") LocalDate debut,
            @Param("fin") LocalDate fin
    );
}
