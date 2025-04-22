package com.heeshin.hope.controller;

import com.heeshin.hope.dto.response.user.GetSignInUserResponseDto;
import com.heeshin.hope.service.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    /*
    * filter/JwtAuthenticationFilter의 SecurityContextHolder에 저장된 인증된 유저 찾기
    * Without @AuthenticationPrincipal
    * Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    * String email = ((UserDetails) authentication.getPrincipal()).getUsername();
    * */
    @GetMapping
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(@AuthenticationPrincipal String email) {
        ResponseEntity<? super GetSignInUserResponseDto> response = userService.getSignInUser(email);
        return response;
    }
}
