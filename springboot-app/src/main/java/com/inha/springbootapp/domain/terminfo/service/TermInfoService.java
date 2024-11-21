package com.inha.springbootapp.domain.terminfo.service;

import com.inha.springbootapp.domain.terminfo.entity.TermInfo;
import com.inha.springbootapp.domain.terminfo.repository.TermInfoRepository;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TermInfoService {

    private final TermInfoRepository termInfoRepository;

    //전체 용어 조회
    public List<TermInfo> findTermInfos(){
        return termInfoRepository.findAll();
    }

    //용어 조회 by id
    public TermInfo findOne(Long termId){
        return termInfoRepository.findOne(termId);
    }
}
