package com.heeshin.hope.dto.response.saerch;

import com.heeshin.hope.common.ResponseCode;
import com.heeshin.hope.common.ResponseMessage;
import com.heeshin.hope.dto.ResponseDto;
import com.heeshin.hope.repository.resultSet.GetPopularListResultSet;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class GetPopularListResponseDto extends ResponseDto {

    private final List<String> popularWordList;

    private GetPopularListResponseDto(List<GetPopularListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.popularWordList = resultSets.stream()
                .map(GetPopularListResultSet::getSearchWord)
                .collect(Collectors.toList());
    }

    public static ResponseEntity<GetPopularListResponseDto> success(List<GetPopularListResultSet> resultSets) {
        GetPopularListResponseDto result = new GetPopularListResponseDto(resultSets);
        return ResponseEntity.ok(result);
    }
}
