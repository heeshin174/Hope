package com.heeshin.hope.dto.request.board;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PostBoardRequestDto {

    // null 뿐만 아니라 빈 것도 안됨
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    // null은 안되지만 빈 배열은 가능
    @NotNull
    private List<String> boardImageList;
}
