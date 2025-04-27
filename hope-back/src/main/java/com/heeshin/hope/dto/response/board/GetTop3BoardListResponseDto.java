package com.heeshin.hope.dto.response.board;

import com.heeshin.hope.common.ResponseCode;
import com.heeshin.hope.common.ResponseMessage;
import com.heeshin.hope.dto.ResponseDto;
import com.heeshin.hope.dto.object.BoardListItem;
import com.heeshin.hope.entity.BoardListViewEntity;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
public class GetTop3BoardListResponseDto extends ResponseDto {

    private final List<BoardListItem> top3List;

    private GetTop3BoardListResponseDto(List<BoardListViewEntity> boardListViewEntities) {
        super(ResponseCode.SUCCESS, ResponseMessage.SUCCESS);
        this.top3List = BoardListItem.getList(boardListViewEntities);
    }

    public static ResponseEntity<GetTop3BoardListResponseDto> success(List<BoardListViewEntity> boardListViewEntities) {
        GetTop3BoardListResponseDto result = new GetTop3BoardListResponseDto(boardListViewEntities);
        return ResponseEntity.ok(result);
    }
}
