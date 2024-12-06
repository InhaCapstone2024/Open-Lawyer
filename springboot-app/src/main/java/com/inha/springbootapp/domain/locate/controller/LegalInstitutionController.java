package com.inha.springbootapp.domain.locate.controller;

import com.inha.springbootapp.domain.locate.dto.request.LegalInstitutionRequestDto;
import com.inha.springbootapp.domain.locate.dto.response.LegalInstitutionResponseDto;
import com.inha.springbootapp.domain.locate.service.LegalInstitutionService;
import com.inha.springbootapp.domain.locate.wrapper.LegalInstitutionWrapper;
import io.github.cdimascio.dotenv.Dotenv;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/legal-institution")
@RequiredArgsConstructor
public class LegalInstitutionController {
    private final LegalInstitutionService legalInstitutionService;

    private final Dotenv dotenv = Dotenv.load();
    String kakaoApiKey = dotenv.get("KAKAO_REST_API_KEY");

    @PostMapping("/nearby")
    public ResponseEntity<LegalInstitutionWrapper<List<LegalInstitutionResponseDto>>> getNearbyLegalInstitutions(
            @RequestBody LegalInstitutionRequestDto legalInstitutionRequestDto){
        LegalInstitutionWrapper<List<LegalInstitutionResponseDto>> responseDto
                = legalInstitutionService.getNearbyLegalInstitutions(legalInstitutionRequestDto, kakaoApiKey);
        return ResponseEntity.ok(responseDto);
    }
}
