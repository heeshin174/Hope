import FavoriteItem from 'components/FavoriteItem';
import './style.css'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Board, CommentListItem, FavoriteListItem } from 'types/interface';
import CommentItem from 'components/CommentItem';
import Pagination from 'components/Pagination';
import { useNavigate, useParams } from 'react-router-dom';
import { useLoginUserStore } from 'stores';
import { BOARD_PATH, BOARD_UPDATE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import defaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { deleteBoardRequest, getBoardRequest, getCommentListRequest, getFavoriteListRequest, increaseViewCountRequest, postCommentRequest, putFavoriteRequest } from 'apis';
import GetBoardResponseDto from 'apis/response/board/get-board.response.dto';
import { ResponseDto } from 'apis/response';
import { DeleteBoardResponseDto, GetCommentListResponseDto, GetFavoriteListResponseDto, IncreaseViewCountResponseDto, PostCommentResponseDto, PutFavoriteResponseDto } from 'apis/response/board';
import { useCookies } from 'react-cookie';
import { PostCommentRequestDto } from 'apis/request/board';
import { usePagination } from 'hooks';

export default function BoardDetail() {

	// state: 게시물 번호 path variable 상태
	const { boardNumber } = useParams();
	const { loginUser } = useLoginUserStore();
	const [cookies, setCookies] = useCookies();

	// function: 네이게이트 함수
	const navigate = useNavigate();
	const increaseViewCountResponse = (responseBody: IncreaseViewCountResponseDto | ResponseDto | null) => {
		if (!responseBody) return;
		const { code } = responseBody;
		if (code === 'NB') alert('존재하지 않는 게시물입니다.');
		if (code === 'DBE') alert('데이터베이스 오류입니다.');
	}

	const BoardDetailTop = () => {

		// state
		const [board, setBoard] = useState<Board | null>(null);
		const [showMore, setShowMore] = useState<boolean>(false);
		const [isWriter, setWriter] = useState<boolean>(false);

		// function 
		const getBoardResponse = (responseBody: GetBoardResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'NB') alert('존재하지 않는 게시물입니다.');
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') {
				navigate(MAIN_PATH());
				return;
			}

			const board: Board = { ...responseBody as GetBoardResponseDto };
			setBoard(board);

			if (!loginUser) {
				setWriter(false);
				return;
			}
			const isWriter = loginUser.email === board.writerEmail;
			setWriter(isWriter);
		}

		// functoin: delete board response 처리 함수
		const deleteBoardResponse = (responseBody: DeleteBoardResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'VF') alert('잘못된 접근입니다.');
			if (code === 'NU') alert('존재하지 않는 유저입니다.');
			if (code === 'NB') alert('존재하지 않는 게시물입니다.');
			if (code === 'NP') alert('권한이 없습니다.');
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') return;
			alert('게시물이 성공적으로 삭제되었습니다.');
			navigate(MAIN_PATH());
			return;
		}

		// event handler
		const onNicknameClickHandler = () => {
			if (!board) return;
			navigate(USER_PATH(board.writerEmail));
		}
		const onMoreButtonClickHandler = () => {
			setShowMore(!showMore);
		}
		const onUpdateButtonClickHandler = () => {
			if (!board || !loginUser) return;
			if (loginUser.email !== board.writerEmail) return;
			navigate(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(board.boardNumber));
		}
		const onDeleteButtonClickHandler = () => {
			if (!board || !loginUser || !boardNumber || !cookies.accessToken) return;
			if (loginUser.email !== board.writerEmail) return;
			deleteBoardRequest(boardNumber, cookies.accessToken).then(deleteBoardResponse);
			navigate(MAIN_PATH());
		}

		// effect: 게시물 번호 path variable이 바뀔 때 마다 게시물 불러오기
		useEffect(() => {
			if (!boardNumber) {
				navigate(MAIN_PATH());
				return;
			}
			getBoardRequest(boardNumber).then(getBoardResponse);
		}, [boardNumber]);

		if (!board) return <></>
		return (
			<div id="board-detail-top">
				<div className="board-detail-top-header">
					<div className="board-detail-title">{board.title}</div>
					<div className="board-detail-top-sub-box">
						<div className="board-detail-write-info-box">
							<div className="board-detail-writer-profile-image" style={{ backgroundImage: `url(${board.writerProfileImage ? board.writerProfileImage : defaultProfileImage})`}}></div>
							<div className="board-detail-writer-nickname" onClick={onNicknameClickHandler}>{board.writerNickname}</div>
							<div className="board-detail-info-divider"></div>
							<div className="board-detail-write-date">{board.writeDatetime}</div>
						</div>
						{isWriter &&
							<div className="icon-button" onClick={onMoreButtonClickHandler}>
								<div className="icon more-icon"></div>
							</div>
						}
						{showMore && (
							<div className="board-detail-more-box">
								<div className="board-detail-update-button" onClick={onUpdateButtonClickHandler}>{'수정'}</div>
								<div className="divider"></div>
								<div className="board-detail-delete-button" onClick={onDeleteButtonClickHandler}>{'삭제'}</div>
							</div>
						)}
					</div>
				</div>
				<div className="divider"></div>
				<div className="board-detail-top-main">
					<div className="board-detail-main-text">{board.content}</div>
					{board.boardImageList.map(image => <img className="board-detail-main-image" src={image} />)}
				</div>
			</div>
		)

	}
	const BoardDetailBottom = () => {

		// state
		const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
		const [isFavorite, setFavorite] = useState<boolean>(false);
		const [showFavorite, setShowFavorite] = useState<boolean>(false);
		const [showComment, setShowComment] = useState<boolean>(false);
		const [comment, setComment] = useState<string>('');
		const [totalCommentCount, setTotalCommentCount] = useState<number>(0);
		// state: 댓글 참조
		const commentRef = useRef<HTMLTextAreaElement | null>(null);
		const { currentPage,setCurrentPage,currentSection,setCurrentSection,viewList,viewPageList,totalSection,setTotalList } = usePagination<CommentListItem>(3);

		// function: get favorite list response 처리 함수
		const getFavoriteListResponse = (responseBody: GetFavoriteListResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'NB') alert('존재하지 않는 게시물입니다.');
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') return;
			const { favoriteList } = responseBody as GetFavoriteListResponseDto;
			setFavoriteList(favoriteList);
			if (!loginUser) {
				setFavorite(false);
				return;
			}
			const isFavorite = favoriteList.findIndex(favorite => favorite.email === loginUser.email) !== -1;
			setFavorite(isFavorite);
		}
		const getCommentListResponse = (responseBody: GetCommentListResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'NB') alert('존재하지 않는 게시물입니다.');
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') return;
			const { commentList } = responseBody as GetCommentListResponseDto;
			setTotalList(commentList);
			setTotalCommentCount(commentList.length);
		}
		const putFavoriteResponse = (responseBody: PutFavoriteResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'NB') alert('존재하지 않는 게시물입니다.');
			if (code === 'VF') alert('잘못된 접근입니다.');
			if (code === 'AF') alert('인증에 실패했습니다.');
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') return;

			if (!boardNumber) return;
			getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
		}
		const postCommentResponse = (responseBody: PostCommentResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'NB') alert('존재하지 않는 게시물입니다.');
			if (code === 'VF') alert('잘못된 접근입니다.');
			if (code === 'AF') alert('인증에 실패했습니다.');
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') return;

			setComment('');
			if (!boardNumber) return;
			getCommentListRequest(boardNumber).then(getCommentListResponse);
		}

		// event handler
		const onFavoriteClickHandler = () => {
			if (!loginUser || !cookies.accessToken || !boardNumber) return;
			putFavoriteRequest(boardNumber, cookies.accessToken).then(putFavoriteResponse);
		}
		const onShowFavoriteClickHandler = () => {
			setShowFavorite(!showFavorite);
		}
		const onShowCommentClickHandler = () => {
			setShowComment(!showComment);
		}
		const onCommentSubmitButtonClickHandler = () => {
			if (!comment || !boardNumber || !loginUser || !cookies.accessToken) return;
			const requestBody: PostCommentRequestDto = { content: comment };
			postCommentRequest(boardNumber, requestBody, cookies.accessToken).then(postCommentResponse);
			alert("댓글을 성공적으로 작성했습니다.");
		}
		const onCommentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
			const { value } = e.target;
			setComment(value);
			if (!commentRef.current) return;
			commentRef.current.style.height = 'auto';
			commentRef.current.style.height = `${commentRef.current.scrollHeight}px`;
		}

		// effect 
		useEffect(() => {
			if (!boardNumber) return;
			getFavoriteListRequest(boardNumber).then(getFavoriteListResponse);
			getCommentListRequest(boardNumber).then(getCommentListResponse);
		}, [boardNumber]);

		// 댓글 목록을 렌더링 직전에 정렬
		// commentList 상태가 업데이트될 때마다 이 부분은 다시 실행됩니다.
		const sortedCommentList = [...viewList];
		sortedCommentList.sort((a, b) => {
			const dateA = new Date(a.writeDatetime);
			const dateB = new Date(b.writeDatetime);
			// 유효하지 않은 날짜 처리 (옵션)
			if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
				console.error("유효하지 않은 writeDatetime 형식입니다.", a.writeDatetime, b.writeDatetime);
				// 유효하지 않은 날짜가 있으면 순서에 영향을 주지 않거나 특정 위치로 보내는 로직 추가 가능
				return 0;
			}
			return dateA.getTime() - dateB.getTime(); // 오래된 날짜(작은 숫자)가 먼저 오도록 오름차순 정렬
		});

		// render
		return (
			<div id="board-detail-bottom">
				<div className="board-detail-bottom-button-box">
					<div className="board-detail-bottom-button-group">
						<div className="icon-button" onClick={onFavoriteClickHandler}>
							{isFavorite ? 
								<div className="icon favorite-fill-icon"></div> :
								<div className="icon favorite-light-icon"></div>
							}
						</div>
						<div className="board-detail-bottom-button-text">{`좋아요 ${favoriteList.length}` }</div>
						<div className="icon-button" onClick={onShowFavoriteClickHandler}>
							{showFavorite ? 
							<div className="icon expand-up-light-icon"></div> :
							<div className="icon expand-down-light-icon"></div>}
						</div>
					</div>
					<div className="board-detail-bottom-button-group">
						<div className="icon-button">
							<div className="icon comment-icon"></div>
						</div>
						<div className="board-detail-bottom-button-text">{ `댓글 ${totalCommentCount}`}</div>
						<div className="icon-button" onClick={onShowCommentClickHandler}>
							{showComment ?
								<div className="icon expand-up-light-icon"></div> :
								<div className="icon expand-down-light-icon"></div> }
						</div>
					</div>
				</div>
				{showFavorite && 
				<div className="board-detail-bottom-favorite-box">
					<div className="board-detail-bottom-favorite-container">
						<div className="board-detail-bottom-favorite-title">{"좋아요 "}<span className='emphasis'>{favoriteList.length}</span></div>
						<div className="board-detail-bottom-favorite-contents">
							{favoriteList.map((item, index) => <FavoriteItem key={index} favoriteListItem={item} />)}
						</div>
					</div>
				</div>
				}
				{showComment && 
				<div className="board-detail-bottom-comment-box">
					<div className="board-detail-bottom-comment-container">
						<div className="board-detail-bottom-comment-title">{'댓글 '}<span className='emphasis'>{totalCommentCount}</span></div>
						<div className="board-detail-bottom-comment-list-container">
							{sortedCommentList.map((item, index)=> <CommentItem key={index} commentListItem={item} /> )}
						</div>
					</div>
					<div className="divider"></div>
					<div className="board-detail-bottom-comment-pagination-box">
						<Pagination
							currentPage={currentPage}
							currentSection={currentSection}
							setCurrentPage={setCurrentPage}
							setCurrentSection={setCurrentSection}
							viewPageList={viewPageList}
							totalSection={totalSection}
						/>
					</div>
					{loginUser !== null && 
						<div className="board-detail-bottom-comment-input-box">
							<div className="board-detail-bottom-comment-input-container">
									<textarea ref={commentRef} className="board-detail-bottom-comment-textarea" placeholder='댓글을 작성해주세요.' value={comment} onChange={onCommentChangeHandler} />
								<div className="board-detail-bottom-comment-button-box">
									<div className={comment === '' ? 'disable-button' : 'black-button'} onClick={onCommentSubmitButtonClickHandler}>{'댓글달기'}</div>
								</div>
							</div>
						</div>
					}
				</div>
				}
			</div>
		);
	};

	// effect
	let effectFlag = true;
	useEffect(() => {
		if (!boardNumber) return;
		if (effectFlag) {
			effectFlag = false;
			return;
		}
		increaseViewCountRequest(boardNumber).then(increaseViewCountResponse);
	}, [boardNumber])


	return (
		<div id="board-detail-wrapper">
			<div className="board-detail-container">
				<BoardDetailTop />
				<BoardDetailBottom />
			</div>
		</div>
	)
}