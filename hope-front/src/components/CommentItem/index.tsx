import { CommentListItem } from 'types/interface'
import './style.css'
import defaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { getElapsedTime } from 'utils/date.util';

interface Props {
  commentListItem: CommentListItem
}

export default function CommentItem({commentListItem}: Props) {
  
  // state: properties
  const { nickname, profileImage, writeDatetime, content } = commentListItem;

  return (
    <div className="comment-list-item">
      <div className="comment-list-item-top">
        <div className="comment-list-item-profile-box">
          <div className="comment-list-item-profile-image" style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})` }}></div>
        </div>
        <div className="comment-list-item-nickname">{nickname}</div>
        <div className="comment-list-item-divider"></div>
        <div className="comment-list-item-time">{getElapsedTime(writeDatetime)}</div>
      </div>
      <div className="comment-list-item-main">
        <div className="comment-list-item-content">{content}</div>
      </div>
    </div>
  )
}