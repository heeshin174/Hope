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

    // 사용자에게 article 정보를 입력받아 Article 객체로 변환하는 메서드
    public Article toEntity() {
        Assert.hasText(title, "Title must not be empty");
        Assert.hasText(content, "Content must not be empty");
        return Article.builder()
                .title(title)
                .content(content)
                .build();
    }
}
