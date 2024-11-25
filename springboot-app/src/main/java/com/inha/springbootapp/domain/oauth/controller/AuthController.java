package com.inha.springbootapp.domain.oauth.controller;

import com.inha.springbootapp.domain.oauth.service.AuthService;
import io.github.cdimascio.dotenv.Dotenv;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    Dotenv dotenv = Dotenv.load();

    @GetMapping("/callback")
    public void callback(@RequestParam String loginType, @RequestParam String code, HttpServletResponse response) throws IOException {
        String accessToken = authService.callback(loginType, code, response);
        String redirectUrl = dotenv.get("SOCIAL_LOGIN_REDIRECT_URL") + "?accessToken=" + accessToken;
        response.sendRedirect(redirectUrl);
    }

    @GetMapping("/token")
    public String getAccessTokenFromRefreshToken(@CookieValue(value = "refreshToken") String refreshToken) {
        return authService.getAccessTokenFromRefreshToken(refreshToken);
    }
}
