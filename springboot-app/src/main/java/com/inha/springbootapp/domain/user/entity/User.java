package com.inha.springbootapp.domain.user.entity;

import com.inha.springbootapp.domain.common.Timestamped;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
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

}