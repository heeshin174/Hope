
package com.heeshin.hope.controller;

import com.heeshin.hope.entity.BoardDocument;
import com.heeshin.hope.service.BoardSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for board search functionality using Elasticsearch.
 * Provides an endpoint to search boards by query string.
 */
@RestController
@RequestMapping("/api/v1/board-search")
public class BoardSearchController {
    @Autowired
    private BoardSearchService boardSearchService;

    @GetMapping
    /**
     * Searches boards by query string using Elasticsearch.
     * @param query The search string.
     * @return List of matching BoardDocument objects.
     */
    public List<BoardDocument> search(@RequestParam String query) {
        return boardSearchService.searchBoards(query);
    }
}
