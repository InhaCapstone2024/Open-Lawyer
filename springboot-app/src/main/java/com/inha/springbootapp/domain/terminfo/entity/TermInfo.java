package com.inha.springbootapp.domain.terminfo.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "TERMINFO")
public class TermInfo {

    @Id
    @Column(name = "TERM_ID")
    private Long id;

    @Column(name = "TERMNAME")
    private String termName;

    @Lob
    private String source;

    @Lob
    private String description;

}
