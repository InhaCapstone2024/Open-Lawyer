package com.inha.springbootapp.domain.oauth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.inha.springbootapp.domain.oauth.dto.SocialLoginUserDto;
import com.inha.springbootapp.domain.oauth.util.GoogleAuthUtil;
import com.inha.springbootapp.domain.oauth.util.KakaoAuthUtil;
import com.inha.springbootapp.domain.oauth.util.NaverAuthUtil;
import com.inha.springbootapp.domain.user.entity.User;
import com.inha.springbootapp.domain.user.repository.UserRepository;
import com.inha.springbootapp.global.util.CookieUtils;
import com.inha.springbootapp.global.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final KakaoAuthUtil kakaoAuthUtil;
    private final NaverAuthUtil naverAuthUtil;
    private final GoogleAuthUtil googleAuthUtil;

    public String callback(String loginType, String code, HttpServletResponse response) throws JsonProcessingException {
        String accessToken;
        SocialLoginUserDto userInfoResponse;
        
        switch (loginType) {
            case "kakao":
                accessToken = kakaoAuthUtil.getAccessToken(code);
                userInfoResponse = kakaoAuthUtil.callUserData(loginType, accessToken);
                break;
            case "naver":
                accessToken = naverAuthUtil.getAccessToken(code);
                userInfoResponse = naverAuthUtil.callUserData(loginType, accessToken);
                break;
            case "google":
                accessToken = googleAuthUtil.getAccessToken(code);
                userInfoResponse = googleAuthUtil.callUserData(loginType, accessToken);
                break;
            default:
                return null;
        }

        User user = saveUser(loginType, userInfoResponse);
        return createAndReturnToken(user, response);
    }

    private User saveUser(String loginType, SocialLoginUserDto userInfoResponse){

        User saveduser = userRepository.findBySocialLoginId(userInfoResponse.getSocialLoginId());
        if (saveduser == null) {
            User user = User.builder()
                    .nickname(userInfoResponse.getNickname())
                    .email(userInfoResponse.getEmail())
                    .loginType(loginType)
                    .socialLoginId(userInfoResponse.getSocialLoginId())
                    .build();
            return userRepository.save(user);
        }
        return saveduser;
    }

    private String createAndReturnToken(User user, HttpServletResponse response){
        int ACCESS_TOKEN_TIME = 60 * 60 * 1000;
        int REFRESH_TOKEN_TIME = 24 * 60 * 60 * 1000;

        String accessToken = JwtUtil.createJWT(user, ACCESS_TOKEN_TIME);
        String refreshToken = JwtUtil.createJWT(user, REFRESH_TOKEN_TIME);

        CookieUtils.addCookie(response,"refreshToken", refreshToken, REFRESH_TOKEN_TIME);

        return accessToken;
    }
}
