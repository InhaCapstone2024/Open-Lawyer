package com.inha.springbootapp.domain.locate.service;

import com.inha.springbootapp.domain.locate.dto.request.LegalInstitutionRequestDto;
import com.inha.springbootapp.domain.locate.dto.response.LegalInstitutionResponseDto;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LegalInstitutionService {
    String baseUrl = "https://dapi.kakao.com/v2/local/search/keyword.json";
    public LegalInstitutionResponseDto getNearbyLegalInstitutions(LegalInstitutionRequestDto legalInstitutionRequestDto,
                                                                                  String apiKey) {
        String apiUrl = baseUrl +
                "?query=법률사무소" +
                "&x=" + legalInstitutionRequestDto.getLongitude() +
                "&y=" + legalInstitutionRequestDto.getLatitude() +
                "&radius=5000";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK" + apiKey);

        HttpEntity<LegalInstitutionResponseDto> httpEntity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<LegalInstitutionResponseDto> responseEntity =
                restTemplate.getForEntity(apiUrl, LegalInstitutionResponseDto.class, httpEntity);

        return responseEntity.getBody();
    }
}
