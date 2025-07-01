package com.vivek.QuizApplication.response;

import lombok.Data;

@Data
public class AuthResponse {
    String jwt;
    String msg;
}
