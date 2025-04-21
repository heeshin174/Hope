package com.heeshin.hope.dto.request.auth;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignUpRequestDto {

    @NotBlank @Email
    private String email;

    @NotBlank @Size(min=8, max=20)
    private String password;
    @NotBlank
    private String nickname;

    @NotBlank @Pattern(regexp = "^[0-9]{11,13}$")
    private String telNumber;

    @NotBlank
    private String address;

    private String addressDetail;

    // true인 상태만 받기
    @NotNull @AssertTrue
    private Boolean agreedPersonal;

}
