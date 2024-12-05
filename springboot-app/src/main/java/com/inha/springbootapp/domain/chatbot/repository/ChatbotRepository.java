package com.inha.springbootapp.domain.chatbot.repository;

import com.inha.springbootapp.domain.chatbot.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatbotRepository extends JpaRepository<Question, Long> {
}
