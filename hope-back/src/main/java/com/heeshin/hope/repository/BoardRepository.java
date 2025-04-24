package com.heeshin.hope.repository;

import com.heeshin.hope.entity.BoardEntity;
import com.heeshin.hope.repository.resultSet.GetBoardResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Long> {

    BoardEntity findByBoardNumber(Long boardNumber);

    // SQL query
    @Query(
            value = "SELECT " +
                    "B.board_number AS boardNumber, " +
                    "B.title AS title, " +
                    "B.content AS content, " +
                    "B.write_datetime AS writeDatetime, " +
                    "B.writer_email AS writerEmail, " +
                    "U.nickname AS writerNickname, " +
                    "U.profile_image AS writerProfileImage " +
                    "FROM board as B " +
                    "INNER JOIN users AS U " +
                    "ON B.writer_email = U.email " +
                    "WHERE board_number = ?1 ",// 첫번째 parameter를 받음
            nativeQuery = true
    )
    GetBoardResultSet getBoard(Long boardNumber);

    boolean existsByBoardNumber(Long boardNumber);
}
