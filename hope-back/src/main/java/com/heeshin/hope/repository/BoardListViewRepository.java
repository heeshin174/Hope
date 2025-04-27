package com.heeshin.hope.repository;

import com.heeshin.hope.entity.BoardListViewEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardListViewRepository extends JpaRepository<BoardListViewEntity, Long> {

    List<BoardListViewEntity> findByOrderByWriteDatetimeDesc();
    List<BoardListViewEntity> findTop3ByWriteDatetimeGreaterThanOrderByFavoriteCountDescCommentCountDescViewCountDescWriteDatetimeDesc(String writeDatetime);
    // Top3는 최신 3개를 가져오는 메서드. LIMIT 3
}

/*
--- 주간 상위 Top 3 board list
SELECT *
FROM board_list_view
WHERE B.write_datetime BETWEEN '2023-10-01' AND '2023-10-31'
ORDER BY favorite_count DESC, comment_count DESC, view_count DESC, write_datetime DESC
LIMTT 3;
 */
