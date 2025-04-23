package com.heeshin.hope.service.implement;

import com.heeshin.hope.entity.UserEntity;
import com.heeshin.hope.dto.ResponseDto;
import com.heeshin.hope.dto.response.user.GetSignInUserResponseDto;
import com.heeshin.hope.repository.UserRepository;
import com.heeshin.hope.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {
        UserEntity userEntity = null;
        try {
            userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return GetSignInUserResponseDto.notExistUser();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetSignInUserResponseDto.success(userEntity);
    }
}
