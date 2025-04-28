package com.heeshin.hope.service;

import com.heeshin.hope.dto.response.saerch.GetPopularListResponseDto;
import com.heeshin.hope.dto.response.saerch.GetRelationListResponseDto;
import org.springframework.http.ResponseEntity;

public interface SearchService {
    ResponseEntity<? super GetPopularListResponseDto> getPopularList();
    ResponseEntity<? super GetRelationListResponseDto> getRelationsList(String searchWord);
}
