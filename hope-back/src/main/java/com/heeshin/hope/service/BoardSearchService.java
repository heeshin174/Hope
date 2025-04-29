package com.heeshin.hope.service;

import com.heeshin.hope.entity.BoardDocument;
import com.heeshin.hope.entity.BoardEntity;
import com.heeshin.hope.repository.BoardElasticsearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for indexing and searching board posts in Elasticsearch.
 * Handles conversion from BoardEntity to BoardDocument and delegates search operations.
 */
@Service
public class BoardSearchService {
    @Autowired
    private BoardElasticsearchRepository elasticsearchRepository;

    /**
     * Indexes a BoardEntity into Elasticsearch as a BoardDocument.
     * Should be called when a board is created or updated.
     * @param entity The BoardEntity to index.
     */
    public void indexBoard(BoardEntity entity) {
        BoardDocument doc = new BoardDocument(
                entity.getBoardNumber(),
                entity.getTitle(),
                entity.getContent(),
                entity.getWriteDatetime(),
                entity.getFavoriteCount(),
                entity.getCommentCount(),
                entity.getViewCount(),
                entity.getWriterEmail()
        );
        elasticsearchRepository.save(doc);
    }

    /**
     * Searches for boards in Elasticsearch by title or content containing the query string.
     * @param query The search string.
     * @return List of matching BoardDocument objects.
     */
    public List<BoardDocument> searchBoards(String query) {
        return elasticsearchRepository.findByTitleContainingOrContentContaining(query, query);
    }

    // Optionally, add methods to delete/update index if needed
}
