package com.heeshin.hope.dto.response.user;

import com.heeshin.hope.common.ResponseCode;
import com.heeshin.hope.common.ResponseMessage;
import com.heeshin.hope.dto.ResponseDto;
import com.heeshin.hope.entity.UserEntity;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class GetUserResponseDto extends ResponseDto {

    private final String email;
    private final String nickname;
    private final String profileImage;

    private GetUserResponseDto(UserEntity userEntity) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.email = userEntity.getEmail();
        this.nickname = userEntity.getNickname();
        this.profileImage = userEntity.getProfileImage();
    }

    public static ResponseEntity<GetUserResponseDto> success(UserEntity userEntity) {
        return ResponseEntity.ok(new GetUserResponseDto(userEntity));
    }

    public static ResponseEntity<ResponseDto> noExistUser() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseDto(ResponseCode.NOT_EXIST_USER, ResponseMessage.NOT_EXIST_USER));
    }
}
