package com.heeshin.hope.repository;

import com.heeshin.hope.entity.FavoriteEntity;
import com.heeshin.hope.entity.primaryKey.FavoritePk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteRepository extends JpaRepository<FavoriteEntity, FavoritePk> {

    FavoriteEntity findByBoardNumberAndUserEmail(Long boardNumber, String userEmail);
}
