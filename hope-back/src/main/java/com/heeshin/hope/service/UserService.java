package com.heeshin.hope.service;

import com.heeshin.hope.dto.response.user.GetSignInUserResponseDto;
import com.heeshin.hope.dto.response.user.GetUserResponseDto;
import com.heeshin.hope.dto.response.user.PatchNicknameResponseDto;
import com.heeshin.hope.dto.response.user.PatchProfileImageResponseDto;
import com.heeshin.hope.dto.request.user.PatchNicknameRequestDto;
import com.heeshin.hope.dto.request.user.PatchProfileImageRequestDto;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email);
    ResponseEntity<? super GetUserResponseDto> getUser(String email);
    ResponseEntity<? super PatchNicknameResponseDto> patchNickname(PatchNicknameRequestDto dto, String email);
    ResponseEntity<? super PatchProfileImageResponseDto> patchProfileImage(PatchProfileImageRequestDto dto, String email);
}
