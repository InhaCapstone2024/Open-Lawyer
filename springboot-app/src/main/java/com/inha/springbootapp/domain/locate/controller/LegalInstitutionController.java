package com.inha.springbootapp.domain.locate.controller;

import com.inha.springbootapp.domain.locate.dto.request.LegalInstitutionRequestDto;
import com.inha.springbootapp.domain.locate.dto.response.LegalInstitutionResponseDto;
import com.inha.springbootapp.domain.locate.service.LegalInstitutionService;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/legal-institution")
@RequiredArgsConstructor
public class LegalInstitutionController {
    private final LegalInstitutionService legalInstitutionService;

    private final Dotenv dotenv = Dotenv.load();

    @GetMapping("/nearby")
    public ResponseEntity<LegalInstitutionResponseDto> getNearbyLegalInstitutions(@RequestBody
                                                                                      LegalInstitutionRequestDto legalInstitutionRequestDto){
        LegalInstitutionResponseDto responseDto
                = legalInstitutionService.getNearbyLegalInstitutions(legalInstitutionRequestDto, dotenv.get("KAKAO_REST_API_KEY"));

        return ResponseEntity.ok(responseDto);
    }
}
