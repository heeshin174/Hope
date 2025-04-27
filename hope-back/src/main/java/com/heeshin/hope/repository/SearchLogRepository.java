package com.heeshin.hope.repository;

import com.heeshin.hope.entity.SearchLogEntity;
import com.heeshin.hope.repository.resultSet.GetPopularListResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Long> {

    @Query(
            value = """
                    SELECT
                        search_word AS searchWord,
                        count(search_word) AS count
                    FROM
                        search_log
                    WHERE
                        relation IS FALSE
                    GROUP BY
                        search_word
                    ORDER BY
                        count DESC
                    LIMIT 15
                    """, // Use Text Blocks for better readability
            nativeQuery = true
    )
    List<GetPopularListResultSet> getPopularList();
}
