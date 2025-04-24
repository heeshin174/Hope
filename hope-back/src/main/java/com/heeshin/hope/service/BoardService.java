package com.heeshin.hope.service;

import com.heeshin.hope.dto.request.board.PostBoardRequestDto;
import com.heeshin.hope.dto.response.board.GetBoardResponseDto;
import com.heeshin.hope.dto.response.board.PostBoardResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super GetBoardResponseDto> getBoard(Long boardNumber);
}
