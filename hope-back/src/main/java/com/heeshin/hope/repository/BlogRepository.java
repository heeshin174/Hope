package com.heeshin.hope.repository;

import com.heeshin.hope.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Article, Long> {
}
