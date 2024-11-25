package com.inha.springbootapp.domain.user.service;

import com.inha.springbootapp.domain.user.entity.User;
import com.inha.springbootapp.domain.user.repository.UserRepository;
import com.inha.springbootapp.global.util.JwtUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUserInfo(String accessToken) {
        String token = accessToken.replace("Bearer", "").trim();

        if (token.isEmpty()) return null;

        Claims claims = JwtUtil.getUserInfoFromToken(token);

        String email = claims.get("email", String.class);
        return userRepository.findByEmail(email);
    }
}
