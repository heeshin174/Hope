package com.heeshin.hope.service;

import com.heeshin.hope.domain.Article;
import com.heeshin.hope.dto.AddArticleRequest;
import com.heeshin.hope.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BlogService {

    private final BlogRepository blogRepository;

    // save article with request
    public Article save(AddArticleRequest request) {
        Article article = request.toEntity();
        return blogRepository.save(article);
    }

    public List<Article> findAll() {
        return blogRepository.findAll();
    }
}
