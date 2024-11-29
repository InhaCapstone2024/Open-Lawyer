package com.inha.springbootapp.domain.chatbot.repository;

import com.inha.springbootapp.domain.chatbot.entity.ChatbotLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatbotLogRepository extends JpaRepository<ChatbotLog, Long> {
}
