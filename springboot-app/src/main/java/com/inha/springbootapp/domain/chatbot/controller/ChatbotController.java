package com.inha.springbootapp.domain.chatbot.controller;

import com.inha.springbootapp.domain.chatbot.dto.request.ChatbotRequestDto;
import com.inha.springbootapp.domain.chatbot.dto.response.ChatbotResponseDto;
import com.inha.springbootapp.domain.chatbot.dto.response.UserQuestionResponseDto;
import com.inha.springbootapp.domain.chatbot.service.ChatbotService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatbotController {
    private final ChatbotService chatbotService;

    @PostMapping("/prediction")
    public ResponseEntity<UserQuestionResponseDto> getPrediction(@RequestBody ChatbotRequestDto chatbotRequestDto) {
        UserQuestionResponseDto userQuestionResponseDto = chatbotService.getPrediction(chatbotRequestDto);
        return ResponseEntity.ok(userQuestionResponseDto);
    }

    @PostMapping("/qustion")
    public ResponseEntity<ChatbotResponseDto> getAnswer(@RequestBody ChatbotRequestDto chatbotRequestDto) {
        ChatbotResponseDto chatbotResponseDto = chatbotService.getAnswer(chatbotRequestDto);
        return ResponseEntity.ok(chatbotResponseDto);
    }
}
