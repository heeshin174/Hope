package com.heeshin.hope.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.heeshin.hope.domain.Article;
import com.heeshin.hope.dto.AddArticleRequest;
import com.heeshin.hope.repository.BlogRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class BlogApiControllerTest {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    private WebApplicationContext context;

    @Autowired
    BlogRepository blogRepository;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        blogRepository.deleteAll();
    }

    @DisplayName("addArticle: 블로그 글 추가")
    @Test
    void addArticle() throws Exception {
        // given
        String url = "/api/articles";
        String title = "Test Title";
        String content = "Test Content";
        AddArticleRequest request = new AddArticleRequest(title, content);

        // 객채를 JSON으로 변환
        final String requestBody = objectMapper.writeValueAsString(request);

        // when
        ResultActions result = mockMvc.perform(post(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody));

        // then
        result.andExpect(status().isCreated());
        List<Article> articles = blogRepository.findAll();

        assertThat(articles.size()).isEqualTo(1);
        assertThat(articles.get(0).getTitle()).isEqualTo(title);
        assertThat(articles.get(0).getContent()).isEqualTo(content);
    }

    @DisplayName("findAllArticles: 블로그 글 모두 조회")
    @Test
    void findAllArticles() throws Exception {
        final String url = "/api/articles";
        final String title = "Test Title";
        final String content = "Test Content";

        blogRepository.save(Article.builder()
                .title(title)
                .content(content)
                .build());

        // when
        ResultActions result = mockMvc.perform(get(url)
                        .accept(MediaType.APPLICATION_JSON));

        // then
        result
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value(title))
                .andExpect(jsonPath("$[0].content").value(content));
    }

    @DisplayName("findArticle: 블로그 글 하나 조회")
    @Test
    public void findArticle() throws Exception {
        // given
        final String url = "/api/articles/{id}";

        String title = "Test Title";
        String content = "Test Content";
        Article article = blogRepository.save(Article.builder()
                .title(title)
                .content(content).build());

        // when
        ResultActions result = mockMvc.perform(get(url, article.getId()));
        // then
        result.andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value(title))
                .andExpect(jsonPath("$.content").value(content));
    }

    @DisplayName("deleteArticle: 블로그 글 삭제")
    @Test
    void deleteArticle() throws Exception {

        String url = "/api/articles/{id}";
        String title = "Test Title";
        String content = "Test Content";
        Article article = blogRepository.save(Article.builder()
                .title(title)
                .content(content).build());

        ResultActions result = mockMvc.perform(delete(url, article.getId()));

        result.andExpect(status().isOk());
        List<Article> articles = blogRepository.findAll();
        assertThat(articles.size()).isEqualTo(0);
    }
}