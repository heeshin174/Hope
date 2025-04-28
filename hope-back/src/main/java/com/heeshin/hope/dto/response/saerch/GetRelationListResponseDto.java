package com.heeshin.hope.dto.response.saerch;

import com.heeshin.hope.common.ResponseCode;
import com.heeshin.hope.common.ResponseMessage;
import com.heeshin.hope.dto.ResponseDto;
import com.heeshin.hope.repository.resultSet.GetRelationListResultSet;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class GetRelationListResponseDto extends ResponseDto {

    private final List<String> relativeWordList;

    private GetRelationListResponseDto(List<GetRelationListResultSet> resultSets) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.relativeWordList = resultSets.stream()
                .map(GetRelationListResultSet::getSearchWord)
                .collect(Collectors.toList());
    }

    public static ResponseEntity<GetRelationListResponseDto> success(List<GetRelationListResultSet> resultSets) {
        return ResponseEntity.ok(new GetRelationListResponseDto(resultSets));
    }
}
