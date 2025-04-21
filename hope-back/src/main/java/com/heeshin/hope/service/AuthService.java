package com.heeshin.hope.service;

import com.heeshin.hope.dto.request.auth.SignInRequestDto;
import com.heeshin.hope.dto.request.auth.SignUpRequestDto;
import com.heeshin.hope.dto.response.auth.SignInResponseDto;
import com.heeshin.hope.dto.response.auth.SignUpResponseDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
