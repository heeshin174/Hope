package com.heeshin.hope.service;

import com.heeshin.hope.dto.request.board.PostBoardRequestDto;
import com.heeshin.hope.dto.request.board.PostCommentRequestDto;
import com.heeshin.hope.dto.response.board.*;
import org.springframework.http.ResponseEntity;

public interface BoardService {
    ResponseEntity<? super GetBoardResponseDto> getBoard(Long boardNumber);
    ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Long boardNumber);
    ResponseEntity<? super GetCommentListResponseDto> getCommentList(Long boardNumber);
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
    ResponseEntity<? super PostCommentResponseDto> postComment(PostCommentRequestDto dto, Long boardNumber, String email);
    ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Long boardNumber, String email);

}
