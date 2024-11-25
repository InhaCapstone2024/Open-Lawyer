package com.inha.springbootapp.domain.user.exception;

public class NotEnoughQuestionCountException extends RuntimeException {
    public NotEnoughQuestionCountException() {
        super();
    }

    public NotEnoughQuestionCountException(String message) {
        super(message);
    }

    public NotEnoughQuestionCountException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotEnoughQuestionCountException(Throwable cause) {
        super(cause);
    }
}
