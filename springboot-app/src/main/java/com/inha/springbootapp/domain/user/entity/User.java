package com.inha.springbootapp.domain.user.entity;

import com.inha.springbootapp.domain.common.Timestamped;
import com.inha.springbootapp.domain.user.exception.NotEnoughQuestionCountException;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@DynamicInsert
public class User extends Timestamped {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = true)
    private String email;

    @Column(nullable = true)
    private String loginType;

    @Column(nullable = true)
    private String socialLoginId;

    @Column(nullable = false)
    @ColumnDefault("'5'")
    private Integer questionCount;

    // QuestionCount 감소

    public void decreaseQuestionCount(){
        int restCount = questionCount - 1;

        if(questionCount < 0) {
            throw new NotEnoughQuestionCountException("질문 차감 횟수가 부족합니다.");
        }
        this.questionCount = restCount;
    }

}