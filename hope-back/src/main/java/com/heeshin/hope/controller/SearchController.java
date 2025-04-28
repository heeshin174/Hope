package com.heeshin.hope.controller;

import com.heeshin.hope.dto.response.saerch.GetPopularListResponseDto;
import com.heeshin.hope.dto.response.saerch.GetRelationListResponseDto;
import com.heeshin.hope.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/v1/search")
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/popular-list")
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {
        return searchService.getPopularList();
    }

    @GetMapping("/{searchWord}/relation-list")
    public ResponseEntity<? super GetRelationListResponseDto> getRelationList(@PathVariable("searchWord") String searchWord) {
        return searchService.getRelationsList(searchWord);
    }
}
