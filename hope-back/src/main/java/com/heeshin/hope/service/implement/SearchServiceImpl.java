package com.heeshin.hope.service.implement;

import com.heeshin.hope.dto.ResponseDto;
import com.heeshin.hope.dto.response.search.GetPopularListResponseDto;
import com.heeshin.hope.dto.response.search.GetRelationListResponseDto;
import com.heeshin.hope.repository.SearchLogRepository;
import com.heeshin.hope.repository.resultSet.GetPopularListResultSet;
import com.heeshin.hope.repository.resultSet.GetRelationListResultSet;
import com.heeshin.hope.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchServiceImpl implements SearchService {

    private final SearchLogRepository searchLogRepository;

    // Use a logger instead of printStackTrace
    private static final Logger LOGGER = LoggerFactory.getLogger(SearchServiceImpl.class);

    @Override
    public ResponseEntity<? super GetPopularListResponseDto> getPopularList() {
        try {
            List<GetPopularListResultSet> resultSets = searchLogRepository.getPopularList();
            return GetPopularListResponseDto.success(resultSets);
        } catch (Exception e) {
            LOGGER.error("Error fetching popular search list", e);
            return ResponseDto.databaseError();
        }
    }

    @Override
    public ResponseEntity<? super GetRelationListResponseDto> getRelationsList(String searchWord) {
        try {
            List<GetRelationListResultSet> resultSets = searchLogRepository.getRelationList(searchWord);
            return GetRelationListResponseDto.success(resultSets);
        } catch (Exception e) {
            LOGGER.error("Error fetching relative search list", e);
            return ResponseDto.databaseError();
        }
    }
}
