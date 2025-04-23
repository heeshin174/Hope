package com.heeshin.hope.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="board_list_view")
@Entity(name="board_list_view")
public class BoardListViewEntity {

    @Id
    private Long boardNumber;
    private String title;
    private String content;
    private String titleImage;
    private Long viewCount;
    private int favoriteCount;
    private int commentCount;
    private String writeDatetime;
    private String writerEmail;
    private String writerNickname;
    private String writerProfileImage;
}
