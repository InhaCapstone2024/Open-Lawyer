package com.inha.springbootapp.domain.locate.wrapper;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LegalInstitutionWrapper<T> {
    private T legalInstitutions;
    private int totalCount;
}
