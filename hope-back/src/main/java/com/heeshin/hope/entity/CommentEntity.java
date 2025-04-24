package com.heeshin.hope.entity;

import com.heeshin.hope.dto.request.board.PostCommentRequestDto;
import com.heeshin.hope.util.DateTimeUtils;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name="comment")
@Table(name="comment")
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentNumber;
    private String content;
    private String writeDatetime;
    private String userEmail;
    private Long boardNumber;

    public CommentEntity(PostCommentRequestDto dto, Long boardNumber, String email) {
        this.content = dto.getContent();
        this.writeDatetime = DateTimeUtils.getCurrentDateTimeString();
        this.userEmail = email;
        this.boardNumber = boardNumber;
    }
}
