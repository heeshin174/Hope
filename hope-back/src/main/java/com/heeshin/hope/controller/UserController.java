package com.heeshin.hope.controller;

import com.heeshin.hope.dto.request.user.PatchNicknameRequestDto;
import com.heeshin.hope.dto.request.user.PatchProfileImageRequestDto;
import com.heeshin.hope.dto.response.user.GetSignInUserResponseDto;
import com.heeshin.hope.dto.response.user.GetUserResponseDto;
import com.heeshin.hope.dto.response.user.PatchNicknameResponseDto;
import com.heeshin.hope.dto.response.user.PatchProfileImageResponseDto;
import com.heeshin.hope.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
        return userService.getSignInUser(email);
    }

    @GetMapping("/{email}")
    public ResponseEntity<? super GetUserResponseDto> getUser(@PathVariable("email") String email) {
        return userService.getUser(email);
    }

    @PatchMapping("/nickname")
    public ResponseEntity<? super PatchNicknameResponseDto> patchNickname(@RequestBody @Valid PatchNicknameRequestDto requestBody, @AuthenticationPrincipal String email) {
        return userService.patchNickname(requestBody, email);
    }
    @PatchMapping("/profile-image")
    public ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(@RequestBody @Valid PatchProfileImageRequestDto requestBody, @AuthenticationPrincipal String email) {
        return userService.patchProfileImage(requestBody, email);
    }
}