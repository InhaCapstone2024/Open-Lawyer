package com.inha.springbootapp.domain.terminfo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Getter;

@Entity
@Getter
public class TermInfo {

    @Id
    @Column(name = "TERM_ID")
    private Long id;

    private String termName;

    @Lob
    private String source;

    @Lob
    private String description;

}
