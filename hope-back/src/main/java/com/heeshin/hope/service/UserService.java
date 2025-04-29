package com.heeshin.hope.service;

import com.heeshin.hope.dto.response.user.GetSignInUserResponseDto;
import com.heeshin.hope.dto.response.user.GetUserResponseDto;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);
    ResponseEntity<? super GetUserResponseDto> getUser(String email);
}
