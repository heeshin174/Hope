package com.heeshin.hope.repository;

import com.heeshin.hope.entity.FavoriteEntity;
import com.heeshin.hope.entity.primaryKey.FavoritePk;
import com.heeshin.hope.repository.resultSet.GetFavoriteListResultSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {

    FavoriteEntity findByBoardNumberAndUserEmail(Long boardNumber, String userEmail);

    @Query(
            value = "SELECT " +
                    "U.email AS email, " +
                    "U.nickname AS nickname, " +
                    "U.profile_image AS profileImage " +
                    "FROM favorite AS F " +
                    "INNER JOIN users AS U " +
                    "ON F.user_email = U.email " +
                    "WHERE F.board_number = ?1 ",// 첫번째 parameter를 받음
            nativeQuery = true
    )
    List<GetFavoriteListResultSet> getFavoriteList(Long boardNumber);
}
