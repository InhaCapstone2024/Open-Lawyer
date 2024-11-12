package com.inha.springbootapp.domain.terminfo.controller;

import com.inha.springbootapp.domain.terminfo.service.TermInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TermInfoController {

    private final TermInfoService termInfoService;

    @GetMapping("/")
}
