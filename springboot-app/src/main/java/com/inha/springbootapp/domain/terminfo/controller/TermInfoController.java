package com.inha.springbootapp.domain.terminfo.controller;

import com.inha.springbootapp.domain.terminfo.dto.Result;
import com.inha.springbootapp.domain.terminfo.dto.TermDetailDto;
import com.inha.springbootapp.domain.terminfo.dto.TermInfoDto;
import com.inha.springbootapp.domain.terminfo.entity.TermInfo;
import com.inha.springbootapp.domain.terminfo.service.TermInfoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/term")
@RequiredArgsConstructor
public class TermInfoController {

    private final TermInfoService termInfoService;

    @GetMapping("/terminfo")
    public Result getTermInfo() {
        System.out.println("getTermInfo 호출됨");
        List<TermInfo> findTermInfos = termInfoService.findTermInfos();
        List<TermInfoDto> collect = findTermInfos.stream()
                .map(m -> new TermInfoDto(m.getTermName()))
                .collect(Collectors.toList());

        return new Result(collect);
    }

    @GetMapping("/terminfo/{id}")
    public TermDetailDto getTermDetail(
            @PathVariable("id") Long id) {

        TermInfo findTermInfo = termInfoService.findOne(id);

        return new TermDetailDto(findTermInfo.getId(),
                findTermInfo.getTermName(),
                findTermInfo.getSource(),
                findTermInfo.getDescription());
    }
}
