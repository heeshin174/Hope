package com.heeshin.hope.service;

import com.heeshin.hope.dto.request.board.PostBoardRequestDto;
import com.heeshin.hope.dto.response.board.GetBoardResponseDto;
import com.heeshin.hope.dto.response.board.GetFavoriteListResponseDto;
import com.heeshin.hope.dto.response.board.PostBoardResponseDto;
import com.heeshin.hope.dto.response.board.PutFavoriteResponseDto;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Long boardNumber);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Long boardNumber);
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Long boardNumber, String email);

}
