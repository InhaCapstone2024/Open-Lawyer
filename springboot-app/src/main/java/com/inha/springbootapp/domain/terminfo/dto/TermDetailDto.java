package com.inha.springbootapp.domain.terminfo.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class TermDetailDto {
    private Long id;

    private String termName;

    private String source;

    private String description;
}
