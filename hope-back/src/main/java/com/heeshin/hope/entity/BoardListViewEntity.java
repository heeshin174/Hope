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
    private int viewCount;
    private int favoriteCount;
    private int commentCount;
    private String writeDatetime;
    private String writerEmail;
    private String writerNickname;
    private String writerProfileImage;
}

/*
// H2 Database View Creation Query
DROP VIEW IF EXISTS board_list_view;

CREATE VIEW board_list_view AS
SELECT
    b.board_number,
    b.title,
    b.content,
    (SELECT MIN(image) FROM image WHERE board_number = b.board_number) AS title_image,
    b.view_count,
    b.favorite_count,
    b.comment_count,
    b.write_datetime,
    u.email AS writer_email,
    u.nickname AS writer_nickname,
    u.profile_image AS writer_profile_image
FROM
    board b
INNER JOIN
    users u ON b.writer_email = u.email;

// MySQL View Creation Query
CREATE VIEW board_list_view AS
SELECT
    B.board_number AS board_number,
    B.title AS title,
    B.content AS content,
    I.image AS title_image,
    B.view_count AS view_count,
    B.favorite_count AS favorite_count,
    B.comment_count AS comment_count,
    B.write_datetime AS write_datetime,
    U.email AS writer_email,
    U.nickname AS writer_nickname,
    U.profile_image AS writer_profile_image
FROM
    board AS B
INNER JOIN
    users AS U ON B.writer_email = U.email
LEFT JOIN
    (SELECT board_number, ANY_VALUE(image) AS image FROM image GROUP BY board_number) AS I
    ON B.board_number = I.board_number;

// PostgreSQL View Creation Query
CREATE VIEW board_list_view AS
SELECT DISTINCT ON (B.board_number)
    B.board_number AS board_number,
    B.title AS title,
    B.content AS content,
    FIRST_VALUE(I.image) OVER (PARTITION BY B.board_number ORDER BY I.created_at DESC) AS title_image, -- 이미지 생성 시간 기준 내림차순 정렬 후 첫 번째 값 선택
    B.view_count AS view_count,
    B.favorite_count AS favorite_count,
    B.write_datetime AS write_datetime,
    U.email AS writer_email,
    U.nickname AS writer_nickname,
    U.profile_image AS writer_profile_image
FROM
    board AS B
INNER JOIN
    "users" AS U ON B.writer_email = U.email
LEFT JOIN
    image AS I ON B.board_number = I.board_number
ORDER BY
    B.board_number, I.created_at DESC; -- 전체 결과도 board_number로 정렬하고 이미지 생성 시간 내림차순으로 정렬하여 FIRST_VALUE가 최신 이미지를 선택하도록 함
 */