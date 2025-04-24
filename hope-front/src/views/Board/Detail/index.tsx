import FavoriteItem from 'components/FavoriteItem';
import './style.css'
import { useEffect, useState } from 'react';
import { CommentListItem, FavoriteListItem } from 'types/interface';
import { commentListMock, favoriteListMock } from 'mocks';
import CommentItem from 'components/CommentItem';
import Pagination from 'components/Pagination';

export default function BoardDetail() {

	const BoardDetailTop = () => {

		// state
		const [showMore, setShowMore] = useState<boolean>(false);

		// event handler
		const onMoreButtonClickHandler = () => {
			setShowMore(!showMore);
		}

		return (
			<div id="board-detail-top">
				<div className="board-detail-top-header">
					<div className="board-detail-title">{ "제목입니다."}</div>
					<div className="board-detail-top-sub-box">
						<div className="board-detail-write-info-box">
							<div className="board-detail-writer-profile-image"></div>
							<div className="board-detail-writer-nickname">{"nickname"}</div>
							<div className="board-detail-info-divider"></div>
							<div className="board-detail-write-date">{ '2024.05.05 10:13:00'}</div>
						</div>
						<div className="icon-button" onClick={onMoreButtonClickHandler}>
							<div className="icon more-icon"></div>
						</div>
						{showMore && (
							<div className="board-detail-more-box">
								<div className="board-detail-update-button">{'수정'}</div>
								<div className="divider"></div>
								<div className="board-detail-delete-button">{'삭제'}</div>
							</div>
						)}
					</div>
				</div>
				<div className="divider"></div>
				<div className="board-detail-top-main">
					<div className="board-detail-main-text">{ "오늘 점심은 불고기"}</div>
					<div className="board-detail-main-image"></div>
				</div>
			</div>
		)

	}
	const BoardDetailBottom = () => {

		// state
		const [favoriteList, setFavoriteList] = useState<FavoriteListItem[]>([]);
		const [commentList, setCommentList] = useState<CommentListItem[]>([]);

		// effect:
		useEffect(() => {
			setFavoriteList(favoriteListMock);
			setCommentList(commentListMock);
		}, []);

		// render
		return (
			<div id="board-detail-bottom">
				<div className="board-detail-bottom-button-box">
					<div className="board-detail-bottom-button-group">
						<div className="icon-button">
							<div className="icon favorite-fill-icon"></div>
						</div>
						<div className="board-detail-bottom-button-text"></div>
						<div className="icon-button">
							<div className="icon up-light-icon"></div>
						</div>
					</div>
					<div className="board-detail-bottom-button-group">
						<div className="icon-button">
							<div className="icon comment-icon"></div>
						</div>
						<div className="board-detail-bottom-button-text"></div>
						<div className="icon-button">
							<div className="icon up-light-icon"></div>
						</div>
					</div>
				</div>
				<div className="board-detail-bottom-favorite-box">
					<div className="board-detail-bottom-favorite-container">
						<div className="board-detail-bottom-favorite-title">{"좋아요 "}<span className='emphasis'>{12 }</span></div>
						<div className="board-detail-bottom-favorite-contents">
							{favoriteList.map(item => <FavoriteItem favoriteListItem={item} />)}
						</div>
					</div>
				</div>
				<div className="board-detail-bottom-comment-box">
					<div className="board-detail-bottom-comment-container">
						<div className="board-detail-bottom-comment-title">{'댓글'}<span className='emphasis'>{12}</span></div>
						<div className="board-detail-bottom-comment-list-container">
							{commentList.map(item => <CommentItem commentListItem={item} /> )}
						</div>
					</div>
					<div className="divider"></div>
					<div className="board-detail-bottom-comment-paginatin-box">
						<Pagination />
					</div>
					<div className="board-detail-bottom-comment-input-container">
						<textarea className="board-detail-bottom-comment-textarea" placeholder='댓글을 작성해주세요.' />
						<div className="board-detail-bottom-comment-button-box">
							<div className="disable-button">{'댓글달기'}</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div id="board-detail-wrapper">
			<div className="board-detail-container">
				<BoardDetailTop />
				<BoardDetailBottom />
			</div>
		</div>
	)
}