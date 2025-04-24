package com.heeshin.hope.service.implement;

import com.heeshin.hope.dto.response.board.GetBoardResponseDto;
import com.heeshin.hope.dto.response.board.GetFavoriteListResponseDto;
import com.heeshin.hope.dto.response.board.PutFavoriteResponseDto;
import com.heeshin.hope.entity.BoardEntity;
import com.heeshin.hope.dto.ResponseDto;
import com.heeshin.hope.dto.request.board.PostBoardRequestDto;
import com.heeshin.hope.dto.response.board.PostBoardResponseDto;
import com.heeshin.hope.entity.FavoriteEntity;
import com.heeshin.hope.entity.ImageEntity;
import com.heeshin.hope.repository.BoardRepository;
import com.heeshin.hope.repository.FavoriteRepository;
import com.heeshin.hope.repository.ImageRepository;
import com.heeshin.hope.repository.UserRepository;
import com.heeshin.hope.repository.resultSet.GetBoardResultSet;
import com.heeshin.hope.repository.resultSet.GetFavoriteListResultSet;
import com.heeshin.hope.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final ImageRepository imageRepository;
    private final FavoriteRepository favoriteRepository;

    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {
        try {
            boolean existedEmail = userRepository.existsByEmail(email);
            if (!existedEmail) return PostBoardResponseDto.notExistUser();

            // BoardEntity 생성 및 저장
            // 요청 DTO와 사용자 이메일을 이용해 BoardEntity 객체 생성
            BoardEntity boardEntity = new BoardEntity(dto, email);
            // 생성된 BoardEntity를 데이터베이스에 저장
            // save 메서드 호출 후 boardEntity 객체에는 DB에서 자동 생성된 boardNumber가 설정됩니다.
            boardRepository.save(boardEntity);

            // 저장된 BoardEntity의 boardNumber(게시물 번호) 가져오기
            // 이미지들은 이 게시물 번호에 연결되어야 합니다.
            Long boardNumber = boardEntity.getBoardNumber();

            List<String> boardImageList = dto.getBoardImageList();
            List<ImageEntity> imageEntities = new ArrayList<>();

            // 이미지 목록을 순회하며 각 이미지에 대해 ImageEntity 생성
            for (String image: boardImageList) {
                ImageEntity imageEntity = new ImageEntity(boardNumber, image);
                imageEntities.add(imageEntity);
            }
            // 이미지를 하나씩 저장해도 되지만 DB 연결이 너무 많아져서 한 번에 처리하는 게 좋음
            imageRepository.saveAll(imageEntities);

        } catch (Exception e){
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        // 모든 과정이 성공적으로 완료되면 성공 응답 반환
        return PostBoardResponseDto.success();
    }

    @Override
    public ResponseEntity<? super GetBoardResponseDto> getBoard(Long boardNumber) {
        GetBoardResultSet resultSet= null;
        List<ImageEntity> imageEntities = new ArrayList<>();
        try {
            resultSet = boardRepository.getBoard(boardNumber);
            if (resultSet == null) return GetBoardResponseDto.noExistBoard();

            imageEntities = imageRepository.findByBoardNumber(boardNumber);

            // view count 증가
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            boardEntity.increaseViewCount();
            boardRepository.save(boardEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetBoardResponseDto.success(resultSet, imageEntities);
    }

    @Override
    public ResponseEntity<? super GetFavoriteListResponseDto> getFavoriteList(Long boardNumber) {
        List<GetFavoriteListResultSet> resultSets = new ArrayList<>();

        try {
            boolean existedBoard = boardRepository.existsByBoardNumber(boardNumber);
            if (!existedBoard) return GetFavoriteListResponseDto.noExistBoard();

            resultSets = favoriteRepository.getFavoriteList(boardNumber);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return GetFavoriteListResponseDto.success(resultSets);
    }

    @Override
    public ResponseEntity<? super PutFavoriteResponseDto> putFavorite(Long boardNumber, String email) {

        try {
            boolean existedUser = userRepository.existsByEmail(email);
            if (!existedUser) return PutFavoriteResponseDto.noExistUser();

            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            if (boardEntity == null) return PutFavoriteResponseDto.noExistBoard();

            FavoriteEntity favoriteEntity = favoriteRepository.findByBoardNumberAndUserEmail(boardNumber, email);
            if (favoriteEntity == null) {
                favoriteEntity = new FavoriteEntity(email, boardNumber);
                favoriteRepository.save(favoriteEntity);
                boardEntity.increaseFavoriteCount();
            }
            else {
                favoriteRepository.delete(favoriteEntity);
                boardEntity.decreaseFavoriteCount();
            }

            boardRepository.save(boardEntity);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.databaseError();
        }
        return PutFavoriteResponseDto.success();
    }
}
