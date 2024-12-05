package com.inha.springbootapp.domain.locate.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LegalInstitutionRequestDto {
    private Double latitude; // 위도
    private Double longitude; // 경도
}
