package com.example.pharamax.repository;

import com.example.pharamax.model.SessionTraitement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public interface SessionTraitementRepository extends JpaRepository<SessionTraitement, Long> {
    Optional<SessionTraitement> findTopByOrdonnanceIdOrderByDateSessionDesc(Long ordonnanceId);

    List<SessionTraitement> findByOrdonnanceId(Long ordonnanceId);
}
