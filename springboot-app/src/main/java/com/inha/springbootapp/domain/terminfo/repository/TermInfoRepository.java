package com.inha.springbootapp.domain.terminfo.repository;

import com.inha.springbootapp.domain.terminfo.entity.TermInfo;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class TermInfoRepository {

    private final EntityManager em;

    public void save(TermInfo termInfo){
        em.persist(termInfo);
    }

    public List<TermInfo> findAll(){
        return em.createQuery("select t from TermInfo t", TermInfo.class).getResultList();
    }

    public TermInfo findOne(Long id){
        return em.find(TermInfo.class, id);
    }

    public List<TermInfo> findByName(String name){
        return em.createQuery("select t from TermInfo t where t.termName = :name", TermInfo.class)
                .setParameter("name", name)
                .getResultList();
    }
}
