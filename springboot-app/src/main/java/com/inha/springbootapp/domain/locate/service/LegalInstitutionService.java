package com.inha.springbootapp.domain.locate.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.inha.springbootapp.domain.locate.dto.request.LegalInstitutionRequestDto;
import com.inha.springbootapp.domain.locate.dto.response.LegalInstitutionResponseDto;
import com.inha.springbootapp.domain.locate.wrapper.LegalInstitutionWrapper;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class LegalInstitutionService {
    String baseUrl = "https://dapi.kakao.com/v2/local/search/keyword.json";
    public LegalInstitutionWrapper<List<LegalInstitutionResponseDto>> getNearbyLegalInstitutions(LegalInstitutionRequestDto legalInstitutionRequestDto,
                                                                    String apiKey) {
        String apiUrl = baseUrl +
                "?query=법률사무소" +
                "&x=" + legalInstitutionRequestDto.getLongitude() +
                "&y=" + legalInstitutionRequestDto.getLatitude() +
                "&radius=5000";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "KakaoAK " + apiKey);
        HttpEntity<String> httpEntity = new HttpEntity<>(headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity =
                restTemplate.exchange(apiUrl, HttpMethod.GET, httpEntity, String.class);

        return parseResponseToWrapper(responseEntity.getBody(), legalInstitutionRequestDto.getCount());
    }

    private LegalInstitutionWrapper<List<LegalInstitutionResponseDto>> parseResponseToWrapper(String responseBody, int count) {
        List<LegalInstitutionResponseDto> dtos = new ArrayList<>();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(responseBody);

            JsonNode documents = rootNode.get("documents");

            int limit = Math.min(documents.size(), count);
            for (int i = 0; i < limit; i++) {
                JsonNode document = documents.get(i);

                LegalInstitutionResponseDto dto = LegalInstitutionResponseDto.builder()
                        .id(document.get("id").asLong())
                        .placeName(document.get("place_name").asText())
                        .phoneNumber(document.get("phone").asText())
                        .addressName(document.get("address_name").asText())
                        .roadAddressName(document.get("road_address_name").asText())
                        .longitude(document.get("x").asDouble())
                        .latitude(document.get("y").asDouble())
                        .build();

                dtos.add(dto);
            }
        } catch (Exception e) {
            throw new RuntimeException("카카오 API Response를 파싱하는 데 실패했습니다.");
        }

        return new LegalInstitutionWrapper<>(dtos, count);
    }
}
