package com.heeshin.hope.controller;

import com.heeshin.hope.dto.request.board.PatchBoardRequestDto;
import com.heeshin.hope.dto.request.board.PostBoardRequestDto;
import com.heeshin.hope.dto.request.board.PostCommentRequestDto;
import com.heeshin.hope.dto.response.board.*;
import com.heeshin.hope.dto.response.user.GetUserBoardListResponseDto;
import com.heeshin.hope.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/{boardNumber}")
    public ResponseEntity<? super GetBoardResponseDto> getBoard(@PathVariable("boardNumber") Long boardNumber) {
        return boardService.getBoard(boardNumber);
    }

    @GetMapping("/{boardNumber}/favorite-list")
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(@PathVariable("boardNumber") Long boardNumber) {
        return boardService.getFavoriteList(boardNumber);
    }

    @GetMapping("/{boardNumber}/comment-list")
    public ResponseEntity<? super GetCommentListResponseDto> getCommentList(@PathVariable("boardNumber") Long boardNumber) {
        return boardService.getCommentList(boardNumber);
    }

    @PostMapping
    public ResponseEntity<? super PostBoardResponseDto> postBoard(@RequestBody @Valid PostBoardRequestDto requestBody, @AuthenticationPrincipal String email) {
        return boardService.postBoard(requestBody, email);
    }

    @PostMapping("/{boardNumber}/comment")
    public ResponseEntity<? super PostCommentResponseDto> postComment(@RequestBody @Valid PostCommentRequestDto requestBody, @PathVariable("boardNumber") Long boardNumber, @AuthenticationPrincipal String email) {
        return boardService.postComment(requestBody, boardNumber, email);
    }

    @PutMapping("/{boardNumber}/favorite")
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(@PathVariable("boardNumber") Long boardNumber, @AuthenticationPrincipal String email) {
        return boardService.putFavorite(boardNumber, email);
    }

    @PatchMapping("/{boardNumber}")
    public ResponseEntity<? super PatchBoardResponseDto> patchBoard(@RequestBody @Valid PatchBoardRequestDto requestBody, @PathVariable("boardNumber") Long boardNumber, @AuthenticationPrincipal String email) {
        return boardService.patchBoard(requestBody, boardNumber, email);
    }

    @GetMapping("/{boardNumber}/increase-view-count")
    public ResponseEntity<? super IncreaseViewCountResponseDto> increaseViewCount(@PathVariable("boardNumber") Long boardNumber) {
        return boardService.increaseViewCount(boardNumber);
    }

    @GetMapping("/latest-list")
    public ResponseEntity<? super GetLatestBoardListResponseDto> getLatestBoardList() {
        ResponseEntity<? super GetLatestBoardListResponseDto> response = boardService.getLatestBoardList();
        return response;
    }

    @GetMapping("/top-3")
    public ResponseEntity<? super GetTop3BoardListResponseDto> getTop3BoardList() {
        ResponseEntity<? super GetTop3BoardListResponseDto> response = boardService.getTop3BoardList();
        return response;
    }

    @GetMapping(value = {"search-list/{searchWord}", "search-list/{searchWord}/{preSearchWord}"})
    public ResponseEntity<? super GetSearchBoardListResponseDto> getSearchBoardList(
            @PathVariable("searchWord") String searchWord,
            @PathVariable(value = "preSearchWord", required = false) String preSearchWord) {
        return boardService.getSearchBoardList(searchWord, preSearchWord);
    }

    @GetMapping("/user-board-list/{email}")
    public ResponseEntity<? super GetUserBoardListResponseDto> getUserBoardList(@PathVariable("email") String email) {

        return boardService.getUserBoardList(email);
    }

    @DeleteMapping("/{boardNumber}")
    public ResponseEntity<? super DeleteBoardResponseDto> deleteBoard(@PathVariable("boardNumber") Long boardNumber, @AuthenticationPrincipal String email) {
        ResponseEntity<? super DeleteBoardResponseDto> response = boardService.deleteBoard(boardNumber, email);
        return response;
    }

}

