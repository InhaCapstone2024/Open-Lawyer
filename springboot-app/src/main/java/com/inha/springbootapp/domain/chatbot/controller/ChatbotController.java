package com.inha.springbootapp.domain.chatbot.controller;

import com.inha.springbootapp.domain.chatbot.dto.request.ChatbotRequestDto;
import com.inha.springbootapp.domain.chatbot.dto.request.UserQuestionRequestDto;
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
    public ResponseEntity<UserQuestionResponseDto> getPrediction(@RequestBody UserQuestionRequestDto userQuestionRequestDto, @RequestHeader("Authorization") String accessToken) {
        UserQuestionResponseDto userQuestionResponseDto = chatbotService.getPrediction(userQuestionRequestDto, accessToken);
        return ResponseEntity.ok(userQuestionResponseDto);
    }

    @PostMapping("/question")
    public ResponseEntity<ChatbotResponseDto> getAnswer(@RequestBody ChatbotRequestDto chatbotRequestDto, @RequestHeader("Authorization") String accessToken) {
        ChatbotResponseDto chatbotResponseDto = chatbotService.getAnswer(chatbotRequestDto, accessToken);
        return ResponseEntity.ok(chatbotResponseDto);
    }
}
