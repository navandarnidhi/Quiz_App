package com.vivek.QuizApplication.request;

import lombok.Data;

@Data
public class LoginRequest {
    String email;
    String otp;
}
