package com.heeshin.hope.service;

import com.heeshin.hope.dto.response.user.GetSignInUserResponseDto;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);
}
