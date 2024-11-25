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

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // HttpEntity 로 request body 와 headers 설정
        HttpEntity<ChatbotRequestDto> requestEntity = new HttpEntity<>(request, headers);

        // POST 요청을 보내고 응답을 객체로 받음
        return restTemplate.postForObject(chatbotUrl, requestEntity, UserQuestionResponseDto.class);
    }

    public ChatbotResponseDto getAnswer(ChatbotRequestDto request) {
        String chatbotUrl = chatbotBaseUrl + "/api/chatbot/question";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ChatbotRequestDto> requestEntity = new HttpEntity<>(request, headers);
        return restTemplate.exchange(chatbotUrl, HttpMethod.POST, requestEntity, ChatbotResponseDto.class).getBody();
    }
}
