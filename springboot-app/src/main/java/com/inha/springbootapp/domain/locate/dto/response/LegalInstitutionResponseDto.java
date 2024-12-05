package com.inha.springbootapp.domain.locate.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LegalInstitutionResponseDto {
    private Long id;
    private String placeName;
    private String phoneNumber;
    private String addressName;
    private String roadAddressName;
    private Double longitude;
    private Double latitude;
}
