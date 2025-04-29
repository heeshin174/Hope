package com.heeshin.hope.repository;

import com.heeshin.hope.entity.BoardDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data Elasticsearch repository for BoardDocument.
 * Provides methods for searching board posts in Elasticsearch.
 */
@Repository
public interface BoardElasticsearchRepository extends ElasticsearchRepository<BoardDocument, String> {
    /**
     * Finds board documents where the title or content contains the given query string.
     * @param title The search string for the title.
     * @param content The search string for the content.
     * @return List of matching BoardDocument objects.
     */
    List<BoardDocument> findByTitleContainingOrContentContaining(String title, String content);
}
