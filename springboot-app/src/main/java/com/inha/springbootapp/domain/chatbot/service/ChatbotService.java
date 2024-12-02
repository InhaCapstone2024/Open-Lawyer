package com.inha.springbootapp.domain.chatbot.service;

import com.inha.springbootapp.domain.chatbot.dto.request.ChatbotRequestDto;
import com.inha.springbootapp.domain.chatbot.dto.response.ChatbotResponseDto;
import com.inha.springbootapp.domain.chatbot.dto.response.UserQuestionResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ChatbotService {

    @Value("${chatbot.base.url}")
    private String chatbotBaseUrl;

    private final RestTemplate restTemplate;

    ChatbotService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public UserQuestionResponseDto getPrediction(ChatbotRequestDto request) {
        String chatbotUrl = chatbotBaseUrl + "/api/chatbot/prediction";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ChatbotRequestDto> requestEntity = new HttpEntity<>(request, headers);
        return restTemplate.exchange(chatbotUrl, HttpMethod.POST, requestEntity, UserQuestionResponseDto.class).getBody();
    }

    public ChatbotResponseDto getAnswer(ChatbotRequestDto request) {
        String chatbotUrl = chatbotBaseUrl + "/api/chatbot/question";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ChatbotRequestDto> requestEntity = new HttpEntity<>(request, headers);
        return restTemplate.exchange(chatbotUrl, HttpMethod.POST, requestEntity, ChatbotResponseDto.class).getBody();
    }
}
