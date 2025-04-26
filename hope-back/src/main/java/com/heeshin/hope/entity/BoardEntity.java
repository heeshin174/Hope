package com.heeshin.hope.entity;

import com.heeshin.hope.dto.request.board.PatchBoardRequestDto;
import com.heeshin.hope.dto.request.board.PostBoardRequestDto;
import com.heeshin.hope.util.DateTimeUtils;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity(name="board")
@Table(name="board")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardNumber;
    private String title;
    private String content;
    private String writeDatetime;
    private int favoriteCount;
    private int commentCount;
    private int viewCount;
    private String writerEmail;

    public BoardEntity(PostBoardRequestDto dto, String email) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
        this.writeDatetime = DateTimeUtils.getCurrentDateTimeString();
        this.favoriteCount = 0;
        this.viewCount = 0;
        this.writerEmail = email;
    }

    public void increaseViewCount() {
        this.viewCount++;
    }
    public void increaseFavoriteCount() {
        this.favoriteCount++;
    }
    public void decreaseFavoriteCount() {
        this.favoriteCount--;
    }
    public void increaseCommentCount() {
        this.commentCount++;
    }
    public void decreaseCommentCount() {
        this.commentCount--;
    }

    public void patchBoard(PatchBoardRequestDto dto) {
        this.title = dto.getTitle();
        this.content = dto.getContent();
    }
}
