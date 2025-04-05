package com.heeshin.hope.dto;

import com.heeshin.hope.domain.Article;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.Assert;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class AddArticleRequest {

    private String title;
    private String content;

    public Article toEntity() {
        Assert.hasText(title, "Title must not be empty");
        Assert.hasText(content, "Content must not be empty");
        return Article.builder()
                .title(title)
                .content(content)
                .build();
    }
}
