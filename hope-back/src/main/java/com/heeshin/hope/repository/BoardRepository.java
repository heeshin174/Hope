package com.heeshin.hope.repository;

import com.heeshin.hope.domain.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<BoardEntity, Long> {
}
