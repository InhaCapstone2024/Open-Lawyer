package com.inha.springbootapp.domain.chatbot.service;

import com.inha.springbootapp.domain.chatbot.dto.request.ChatbotRequestDto;
import com.inha.springbootapp.domain.chatbot.dto.request.UserQuestionRequestDto;
import com.inha.springbootapp.domain.chatbot.dto.response.ChatbotResponseDto;
import com.inha.springbootapp.domain.chatbot.dto.response.UserQuestionResponseDto;
import com.inha.springbootapp.domain.chatbot.entity.ChatbotLog;
import com.inha.springbootapp.domain.chatbot.entity.Question;
import com.inha.springbootapp.domain.chatbot.repository.ChatbotLogRepository;
import com.inha.springbootapp.domain.chatbot.repository.ChatbotRepository;
import com.inha.springbootapp.domain.user.entity.User;
import com.inha.springbootapp.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class ChatbotService {

    @Value("${chatbot.base.url}")
    private String chatbotBaseUrl;

    private final RestTemplate restTemplate;
    private final ChatbotRepository chatbotRepository;
    private final UserService userService;
    private final ChatbotLogRepository chatbotLogRepository;

    public UserQuestionResponseDto getPrediction(UserQuestionRequestDto request, String accessToken) {
        String chatbotUrl = chatbotBaseUrl + "/api/chatbot/prediction";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<UserQuestionRequestDto> requestEntity = new HttpEntity<>(request, headers);
        UserQuestionResponseDto userQuestionResponseDto = restTemplate.exchange(chatbotUrl, HttpMethod.POST, requestEntity, UserQuestionResponseDto.class).getBody();

        User findUser = userService.getUserInfo(accessToken);
        findUser.decreaseQuestionCount();

        chatbotRepository.save(Question.builder()
                .user(findUser)
                .winPercentage(userQuestionResponseDto.getProbability())
                .build());

        return userQuestionResponseDto;
    }

    public ChatbotResponseDto getAnswer(ChatbotRequestDto request, String accessToken) {
        String chatbotUrl = chatbotBaseUrl + "/api/chatbot/question";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<ChatbotRequestDto> requestEntity = new HttpEntity<>(request, headers);
        ChatbotResponseDto chatbotResponseDto = restTemplate.exchange(chatbotUrl, HttpMethod.POST, requestEntity, ChatbotResponseDto.class).getBody();

        User findUser = userService.getUserInfo(accessToken);
        findUser.decreaseQuestionCount();

        chatbotLogRepository.save(ChatbotLog.builder()
                .userQuestion(request.getQuestion())
                .answer(chatbotResponseDto.getAnswer())
                .question(chatbotRepository.findById(request.getQuestionId())
                        .orElseThrow(
                                NullPointerException::new
                        ))
                .build());

        return chatbotResponseDto;
    }
}
