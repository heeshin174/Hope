package com.heeshin.hope.repository;

import com.heeshin.hope.entity.CommentEntity;
import com.heeshin.hope.repository.resultSet.GetCommentListResultSet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    @Query(
            value = "SELECT " +
                    "U.nickname AS nickname, " +
                    "U.profile_image AS profileImage, " +
                    "C.write_datetime AS writeDatetime, " +
                    "C.content AS content " +
                    "FROM comment AS C " +
                    "INNER JOIN users AS U " +
                    "ON C.user_email = U.email " +
                    "WHERE C.board_number = ?1 " +
                    "ORDER BY writeDatetime DESC",
            nativeQuery = true
    )
    List<GetCommentListResultSet> getCommentList(Long boardNumber);

    @Transactional
    void deleteByBoardNumber(Long boardNumber);
}
