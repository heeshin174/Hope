import { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import defaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { useParams } from 'react-router-dom';

// component
export default function User() {

	// state: 
	const { userEmail } = useParams();

	// component
	const UserTop = () => {

		// state
		const [isMyPage, setMyPage] = useState<boolean>(true);
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
		return (
			<div className="">
	
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