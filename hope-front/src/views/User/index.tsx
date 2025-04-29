import { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import defaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
import BoardItem from 'components/BoardItem';
import { useLoginUserStore } from 'stores';
import { BOARD_PATH, BOARD_WRITE_PATH, USER_PATH } from 'constant';

// component
export default function User() {

	// state: 
	const { userEmail } = useParams();
	// state: loginUser state
	const { loginUser } = useLoginUserStore();
	const [isMyPage, setMyPage] = useState<boolean>(false);

	// function: navigate to board list
	const navigate = useNavigate();

	// component
	const UserTop = () => {

		// state
		const [isNicknameChange, setIsNicknameChange] = useState<boolean>(false);
		const [nickname, setNickname] = useState<string>('');
		const [changeNickname, setChangeNickname] = useState<string>('');
		const [profileImage, setProfileImage] = useState<string | null>(null);
		// image file input ref
		const imageInputRef = useRef<HTMLInputElement | null>(null);

		// event hanlder: 닉네임 수정 버튼 클릭 이벤트 처리
		const onNicknameEditButtonClickHandler = () => {
			setChangeNickname(nickname);
			setIsNicknameChange(!isNicknameChange);
		}
		const onProfileImageButtonClickHandler = () => {
			if (!isMyPage) return;
			if (!imageInputRef.current) return;
			imageInputRef.current.click();
		}
		const onProfileImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			if (!e.target.files || !e.target.files.length) return;
			const file = e.target.files[0];
			const data = new FormData();
			data.append('file', file);
		};
		const onNicknameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			if (value.length > 30) return;
			setChangeNickname(value);
		}

		// effect
		useEffect(() => {
			if (!userEmail) return;
			setNickname('nickname23');
			setProfileImage('https://content.presentermedia.com/files/clipart/00028000/28699/sad_worry_emoji_face_800_wht.jpg');
			setProfileImage(null);
		}, [userEmail]);
		
		return (
			<div className="user-top-wrapper">
				<div className="user-top-container">
					{isMyPage ?
					<div className="user-top-my-profile-image-box" onClick={onProfileImageButtonClickHandler}>
						{profileImage !== null ?
						<div className='user-top-profile-image' style={{ backgroundImage: `url(${profileImage})` }}></div> :
						<div className="icon-box-large">
							<div className="icon image-box-white-icon"></div>
						</div>
						}
						<input ref={imageInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onProfileImageChangeHandler} />
					</div> :
					<div className='user-top-profile-image-box' style={{ backgroundImage: `url(${profileImage ? profileImage : defaultProfileImage})` }}></div>
					}
					<div className="user-top-info-box">
						<div className="user-top-info-nickname-box">
							{isMyPage ?
							<>
							{isNicknameChange ? 
							<input className='user-top-info-nickname-input' size={changeNickname !== '' ? changeNickname.length : 1} type="text" value={changeNickname} onChange={onNicknameChangeHandler} /> :
							<div className="user-top-info-nickname">{nickname}</div>
							}
							<div className="icon-button" onClick={onNicknameEditButtonClickHandler}>
								<div className="icon edit-light-icon"></div>
							</div>
							</> :
							<div className="user-top-info-nickname">{nickname}</div>
							}
						</div>
						<div className="user-top-info-email">{userEmail}</div>
					</div>
				</div>
			</div>
		)
	}
	
	// component
	const UserBottom = () => {

		// state
		const [count, setCount] = useState<number>(0);
		const [userBoardList, setBoardList] = useState<BoardListItem[]>([]);

		// event handler: side card click event handler
		const onSideCardClickHandler = () => {
			if (isMyPage) navigate(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
			else if (loginUser) navigate(USER_PATH(loginUser.email));
		};


		// effect
		useEffect(() => {

		}, [userEmail]);

		// render
		return (
			<div className="user-bottom-wrapper">
				<div className="user-bottom-container">
					<div className="user-bottom-title">{isMyPage ? '내 게시물 ' : '게시물 ' }<span className="emphasis">{count}</span></div>
					<div className="user-bottom-contents-box">
					{count === 0 ? 
					<div className="user-bottom-contents-nothing">{'게시물이 없습니다.'}</div> :
					<div className="user-bottom-contents">
						{userBoardList.map((boardListItem, index) => (
							<BoardItem key={index} boardListItem={boardListItem} />
						))}
					</div>
					}
					<div className="user-bottom-side-box">
						<div className="user-bottom-side-card" onClick={onSideCardClickHandler}>
							<div className="user-bottom-side-container">
								{isMyPage ? 
								<>
									<div className="icon-box">
										<div className="icon edit-light-icon"></div>
									</div>
									<div className="user-bottom-side-text">{'글쓰기'}</div>
								</> :
								<>
									<div className="user-bottom-side-text">{'내 게시물로 가기'}</div>
									<div className="icon-box">
										<div className="icon arrow-right-icon"></div>
									</div>
								</>
								}
							</div>
						</div>
					</div>
				</div>
				<div className="user-bottom-pagination-box"></div>
				</div>
			</div>
		)
	}

	return (
		<div>
			<UserTop />
			<UserBottom />
		</div>
	)
}