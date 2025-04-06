package com.heeshin.hope.controller;

import com.heeshin.hope.domain.Article;
import com.heeshin.hope.dto.AddArticleRequest;
import com.heeshin.hope.dto.ArticleResponse;
import com.heeshin.hope.dto.UpdateArticleReqeust;
import com.heeshin.hope.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/articles") // API 엔드포인트를 "/api/articles"로 설정
public class BlogApiController {

    private final BlogService blogService;

    @PostMapping
    public ResponseEntity<Article> addArticle(@RequestBody AddArticleRequest request) {
        Article article = blogService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(article);
    }

    @GetMapping
    public ResponseEntity<List<ArticleResponse>> findAllArticles() {
        // List<Article>를 받아 List<ArticleResponse>로 변환
        List<ArticleResponse> articles = blogService.findAll()
                .stream()
                .map(ArticleResponse::new).toList();

        return ResponseEntity.ok().body(articles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleResponse> findArticleById(@PathVariable Long id) {
        Article article = blogService.findById(id);
        return ResponseEntity.ok().body(new ArticleResponse(article));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        blogService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody UpdateArticleReqeust request) {
        Article article = blogService.update(id, request);
        return ResponseEntity.ok().body(article);
    }
}
