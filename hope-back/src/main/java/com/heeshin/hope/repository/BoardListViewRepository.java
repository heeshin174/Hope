package com.heeshin.hope.repository;

import com.heeshin.hope.entity.BoardListViewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity, Long> {

    List<BoardListViewEntity> findByOrderByWriteDatetimeDesc();
    // Top3는 최신 3개를 가져오는 메서드. LIMIT 3
    List<BoardListViewEntity> findTop3ByWriteDatetimeGreaterThanOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc(String writeDatetime);
    List<BoardListViewEntity> findByTitleContainsOrContentContainsOrderByWriteDatetimeDesc(String title, String content);
    List<BoardListViewEntity> findByWriterEmailOrderByWriteDatetimeDesc(String email);
}

/*
--- 주간 상위 Top 3 board list
SELECT *
FROM board_list_view
WHERE B.write_datetime BETWEEN '2023-10-01' AND '2023-10-31'
ORDER BY favorite_count DESC, comment_count DESC, view_count DESC, write_datetime DESC
LIMTT 3;

--- 검색 리스트 불러오기
SELECT *
FROM board_list_view
WHERE title LIKE '%검색어%' OR content LIKE '%검색어%'
ORDER BY write_datetime DESC;
 */
