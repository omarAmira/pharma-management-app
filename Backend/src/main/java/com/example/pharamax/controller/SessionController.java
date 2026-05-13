package com.example.pharamax.controller;

import com.example.pharamax.dto.RapportMedicamentJourDTO;
import com.example.pharamax.dto.SessionRequestDTO;
import com.example.pharamax.dto.SessionResponseDTO;
import com.example.pharamax.service.SessionServiceImplTest;
import com.itextpdf.text.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.LinkedHashMap;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.ByteArrayOutputStream;

import java.time.LocalDate;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionServiceImplTest sessionService;

    public SessionController(SessionServiceImplTest sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping("/creer/{ordonnanceId}")
    public ResponseEntity<SessionResponseDTO> creerPremiereSession(
            @PathVariable Long ordonnanceId,
            @RequestParam Integer joursDistribution) {

        return ResponseEntity.ok(
                sessionService.creerPremiereSession(ordonnanceId, joursDistribution));
    }

    @PostMapping("/arrivee/{ordonnanceId}")
    public ResponseEntity<Map<String, String>> traiterArrivee(@PathVariable Long ordonnanceId) {
        String message = sessionService.traiterArriveePatient(ordonnanceId);
        Map<String, String> response = new HashMap<>();
        response.put("message", message);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/ordonnance/{ordonnanceId}")
    public ResponseEntity<List<SessionResponseDTO>> getSessions(
            @PathVariable Long ordonnanceId) {

        return ResponseEntity.ok(
                sessionService.getSessionsByOrdonnance(ordonnanceId));
    }


    //Nouvelle Fonctionnalité :
    @PostMapping("/manuel")
    public ResponseEntity<SessionResponseDTO> creerSessionManuelle(
            @RequestBody SessionRequestDTO request) {

        return ResponseEntity.ok(
                sessionService.creerSessionManuelle(request));
    }


    @DeleteMapping("/{sessionId}/annuler")
    public ResponseEntity<Map<String, String>> annulerSession(@PathVariable Long sessionId) {
        sessionService.annulerSession(sessionId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Session annulée et stock corrigé");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/rapport/medicaments")
    public ResponseEntity<List<RapportMedicamentJourDTO>>
    getRapportMedicamentsEntreDeuxDates(

            @RequestParam LocalDate debut,
            @RequestParam LocalDate fin
    ) {

        return ResponseEntity.ok(
                sessionService.getRapportMedicamentsEntreDeuxDates(
                        debut,
                        fin
                )
        );
    }

    @GetMapping("/rapport/medicaments/pdf")
    public ResponseEntity<byte[]> exporterRapportPdf(
            @RequestParam LocalDate debut,
            @RequestParam LocalDate fin
    ) {

        List<RapportMedicamentJourDTO> rapport =
                sessionService.getRapportMedicamentsEntreDeuxDates(debut, fin);

        try {

            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            Document document = new Document(PageSize.A4);

            PdfWriter.getInstance(document, baos);

            document.open();

            // ===== Fonts =====

            Font titleFont =
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);

            Font sectionFont =
                    FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);

            Font normalFont =
                    FontFactory.getFont(FontFactory.HELVETICA, 12);

            // ===== Title =====

            Paragraph title =
                    new Paragraph(
                            "Rapport des médicaments distribués",
                            titleFont
                    );

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            document.add(new Paragraph(" "));

            document.add(new Paragraph(
                    "Période : " + debut + " jusqu'à " + fin,
                    normalFont
            ));

            document.add(new Paragraph(
                    "Date génération : " + LocalDate.now(),
                    normalFont
            ));

            document.add(new Paragraph(" "));

            // ===== Groupement par date =====

            Map<LocalDate, List<RapportMedicamentJourDTO>> grouped =
                    rapport.stream()
                            .collect(Collectors.groupingBy(
                                    RapportMedicamentJourDTO::getDate,
                                    LinkedHashMap::new,
                                    Collectors.toList()
                            ));

            // ===== Sections =====

            for (Map.Entry<LocalDate,
                    List<RapportMedicamentJourDTO>> entry : grouped.entrySet()) {

                LocalDate date = entry.getKey();

                List<RapportMedicamentJourDTO> data = entry.getValue();

                // ===== Date section =====

                Paragraph dateTitle =
                        new Paragraph(
                                "Date : " + date,
                                sectionFont
                        );

                dateTitle.setSpacingBefore(15);

                dateTitle.setSpacingAfter(10);

                document.add(dateTitle);

                // ===== Table =====

                PdfPTable table = new PdfPTable(2);

                table.setWidthPercentage(100);

                table.setWidths(new int[]{4, 2});

                // Headers

                PdfPCell h1 =
                        new PdfPCell(new Phrase("Médicament"));

                PdfPCell h2 =
                        new PdfPCell(new Phrase("Quantité"));

                h1.setHorizontalAlignment(Element.ALIGN_CENTER);
                h2.setHorizontalAlignment(Element.ALIGN_CENTER);

                table.addCell(h1);
                table.addCell(h2);

                int totalJour = 0;

                for (RapportMedicamentJourDTO dto : data) {

                    table.addCell(dto.getMedicament());

                    table.addCell(
                            dto.getQuantiteTotale().toString()
                    );

                    totalJour += dto.getQuantiteTotale().intValue();
                }


                document.add(table);
            }

            // ===== Footer =====

            document.add(new Paragraph(" "));

            Paragraph footer =
                    new Paragraph(
                            "Rapport généré automatiquement par le système pharmacie.",
                            normalFont
                    );

            footer.setAlignment(Element.ALIGN_CENTER);

            document.add(footer);

            document.close();

            HttpHeaders headers = new HttpHeaders();

            headers.setContentType(MediaType.APPLICATION_PDF);

            headers.setContentDisposition(
                    ContentDisposition.builder("attachment")
                            .filename("rapport_medicaments.pdf")
                            .build()
            );

            return new ResponseEntity<>(
                    baos.toByteArray(),
                    headers,
                    HttpStatus.OK
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Erreur génération PDF : " + e.getMessage()
            );
        }
    }

    @GetMapping("/rapport/medicaments/jour")
    public ResponseEntity<List<RapportMedicamentJourDTO>> getParJour(
            @RequestParam LocalDate date
    ) {
        return ResponseEntity.ok(
                sessionService.getRapportMedicamentsEntreDeuxDates(date, date)
        );
    }
}