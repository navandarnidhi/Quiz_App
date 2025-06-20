package com.dailycodework.quizonline.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
@Entity
@Table(name = "Token")
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
public class Token {
    private static final long serialVersionUID = 1L;

    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @NonNull
    private Account account;

    @Column(name = "`key`", length = 100, nullable = false, unique = true)
    @NonNull
    private String key;

    @Column(name = "`type`", nullable = false)
    @Enumerated(EnumType.STRING)
    @NonNull
    private Type type;

    @Column(name = "expired_date")
    @Temporal(TemporalType.TIMESTAMP)
    @NonNull
    private Date expiredDate;

    @NoArgsConstructor
    @Getter
    public enum Type {
        REFRESH_TOKEN, REGISTER, FORGOT_PASSWORD;
    }


}
