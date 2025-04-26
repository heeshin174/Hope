import { BoardListItem } from 'types/interface';
import './style.css'
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '@/assets/images/default-profile-image.jpg';


interface Props {
    topListItem: BoardListItem;
}

export default function TopItem({ topListItem }: Props) {
   
    // properties
    const { boardNumber, title, content, boardTitleImage } = topListItem;
    const { favoriteCount, commentCount, viewCount } = topListItem;
    const { writeDatetime, writerNickname, writerProfileImage } = topListItem;

    // function: navigate
    // const navigate = useNavigate();

    // event handler
    const onClickHandler = () => {
        // navigate(`/board/${boardNumber}`);
        // navigate(boardNumber);
    }
    
    return (
        <div className='top-list-item' style={{ backgroundImage: `url(${boardTitleImage})`}} onClick={onClickHandler}>
            <div className="top-list-item-main-box">
                <div className="top-list-item-top">
                    <div className="top-list-item-profile-box">
                        <div className="top-list-item-profile-image" style={{ backgroundImage: `url(${writerProfileImage ? writerProfileImage : defaultProfileImage})`}}></div>
                    </div>
                    <div className="top-list-item-write-box">
                        <div className="top-list-item-nickname">{writerNickname}</div>
                        <div className="top-list-item-write-date">{writeDatetime}</div>
                    </div>
                </div>
                <div className="top-list-item-middle">
                    <div className="top-list-item-title">{title}</div>
                    <div className="top-list-item-content">{content}</div>
                </div>
                <div className="top-list-item-bottom">
                    <div className="top-list-item-counts">
                        {`좋아요 ${favoriteCount}개 댓글 ${commentCount}개 조회수 ${viewCount}회`}
                    </div>
                </div>
            </div>
        </div>
    )
}