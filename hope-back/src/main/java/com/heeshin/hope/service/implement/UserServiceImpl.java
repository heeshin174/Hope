package com.heeshin.hope.service.implement;

import com.heeshin.hope.dto.response.user.GetUserResponseDto;
import com.heeshin.hope.entity.UserEntity;
import com.heeshin.hope.dto.ResponseDto;
import com.heeshin.hope.dto.response.user.GetSignInUserResponseDto;
import com.heeshin.hope.repository.UserRepository;
import com.heeshin.hope.service.UserService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public ResponseEntity<? super GetSignInUserResponseDto> getSignInUser(String email) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return GetSignInUserResponseDto.noExistUser();
            return GetSignInUserResponseDto.success(userEntity);
        } catch (Exception e) {
            LOGGER.error("Error fetching sign in user", e);
            return ResponseDto.databaseError();
        }
    }

    @Override
    public ResponseEntity<? super GetUserResponseDto> getUser(String email) {
        try {
            UserEntity userEntity = userRepository.findByEmail(email);
            if (userEntity == null) return GetUserResponseDto.noExistUser();
            return GetUserResponseDto.success(userEntity);
        } catch (Exception e) {
            LOGGER.error("Error fetching user", e);
            return ResponseDto.databaseError();
        }
    }
}
