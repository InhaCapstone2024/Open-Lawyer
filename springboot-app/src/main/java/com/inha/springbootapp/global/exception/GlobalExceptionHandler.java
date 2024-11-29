package com.inha.springbootapp.global.exception;

import com.inha.springbootapp.domain.user.exception.NotEnoughQuestionCountException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NotEnoughQuestionCountException.class)
    public ResponseEntity<String> handleNotEnoughQuestionCountException(NotEnoughQuestionCountException exception){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(exception.getMessage());
    }
}
