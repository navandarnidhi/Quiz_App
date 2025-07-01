package com.vivek.QuizApplication.request;

import lombok.Data;

@Data
public class SignupRequest {
    String email;
    String otp;
    String fullName;
}
