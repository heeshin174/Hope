import "./style.css";
import { BoardListItem } from "types/interface";
import { useNavigate } from "react-router-dom";
import defaultProfileImage from '@/assets/images/default-profile-image.jpg';

interface BoardListItemProps {
    boardListItem: BoardListItem;
}


// Board List Item Component
export default function BoardItem({ boardListItem }: BoardListItemProps) {

    // properties
    const { boardNumber, title, content, boardTitleImage } = boardListItem;
    const { favoriteCount, commentCount, viewCount } = boardListItem;
    const { writeDatetime, writerNickname, writerProfileImage } = boardListItem;

    // function: navigate
    // const navigator = useNavigate();

    // event handler
    const onClickHandler = () => {
        // navigator(`/board/${boardNumber}`);
        // navigator(boardNumber);
    }

    return (
        <div className="board-list-item" onClick={onClickHandler}>
            <div className="board-list-item-box">
                <div className="board-list-item-top">
                    <div className="board-list-item-profile-box">
                        <div className="board-list-item-profile-image" style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>
                    </div>
                    <div className="board-list-item-write-box">
                        <div className="board-list-item-nickname">{writerNickname}</div>
                        <div className="board-list-item-write-date">{writeDatetime}</div>
                    </div>
                </div>
                <div className="board-list-item-middle">
                    <div className="board-list-item-title">{title}</div>
                    <div className="board-list-item-content">{content}</div>
                </div>
                <div className="board-list-item-bottom">
                    <div className="board-list-item-counts">
                        {`좋아요 ${favoriteCount}개 댓글 ${commentCount}개 조회수 ${viewCount}회`}
                    </div>
                </div>
            </div>
            {boardTitleImage && (
                <div className="board-list-item-image-box">
                    <div className="board-list-item-image" style={{ backgroundImage: `url(${boardTitleImage})`}}></div>
                </div>
            )}
        </div>
    )
}