package com.inha.springbootapp.domain.terminfo.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "TermInfo")
public class TermInfo {

    @Id
    @Column(name = "TERM_ID")
    private Long id;

    @Column(name = "TERMNAME")
    private String termName;

    @Column(columnDefinition = "LONGTEXT")
    private String source;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

}
