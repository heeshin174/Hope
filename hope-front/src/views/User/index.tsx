import { ChangeEvent, useEffect, useRef, useState } from 'react'
import './style.css'
import defaultProfileImage from '@/assets/images/default-profile-image.jpg';
import { useNavigate, useParams } from 'react-router-dom';
import { BoardListItem } from 'types/interface';
import BoardItem from 'components/BoardItem';
import { useLoginUserStore } from 'stores';
import { BOARD_PATH, BOARD_WRITE_PATH, MAIN_PATH, USER_PATH } from 'constant';
import { fileUploadRequest, getUserBoardListRequest, getUserRequest, patchNicknameRequest, patchProfileImageRequest } from 'apis';
import { GetUserResponseDto, PatchNicknameResponseDto, PatchProfileImageResponseDto } from 'apis/response/user';
import { ResponseDto } from 'apis/response';
import { PatchNicknameRequestDto, PatchProfileImageRequestDto } from 'apis/request/user';
import { useCookies } from 'react-cookie';
import { usePagination } from 'hooks';
import { GetUserBoardListResponseDto } from 'apis/response/board';
import Pagination from 'components/Pagination';

// component
export default function User() {

	// state: 
	const { userEmail } = useParams();
	// state: loginUser state
	const { loginUser } = useLoginUserStore();
	const [cookies, setCookies] = useCookies();
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

		// function: get user response 처리 함수
		const getUserResponse = (responseBody: GetUserResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'NU') alert('존재하지 않는 사용자입니다.'); 
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') {
				navigate(MAIN_PATH());
				return;
			} 
			const { nickname, profileImage } = responseBody as GetUserResponseDto;
			setNickname(nickname);
			setProfileImage(profileImage);
			const isMyPage = userEmail === loginUser?.email;
			setMyPage(isMyPage);
		}
		const fileUploadResponse = (profileImage: string | null) => {
			if (!profileImage) return;
			if (!cookies.accessToken) return;
			const requestBody: PatchProfileImageRequestDto = { profileImage };
			patchProfileImageRequest(requestBody, cookies.accessToken).then(patchProfileImageResponse);
		}
		const patchProfileImageResponse = (responseBody: PatchProfileImageResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'AF') alert('인증에 실패했습니다.');
			if (code === 'NU') alert('존재하지 않는 사용자입니다.');
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') return;
			if (!userEmail) return;
			getUserRequest(userEmail).then(getUserResponse);
		};
		const patchNicknameResponse = (responseBody: PatchNicknameResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'VF') alert('닉네임은 필수입니다.');
			if (code === 'AF') alert('인증에 실패했습니다.');
			if (code === 'DN') alert('중복된 닉네임입니다.');
			if (code === 'NU') alert('존재하지 않는 사용자입니다.');
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') return;
			if (!userEmail) return;
			getUserRequest(userEmail).then(getUserResponse);
			setIsNicknameChange(false);
		};

		// event hanlder: 닉네임 수정 버튼 클릭 이벤트 처리
		const onNicknameEditButtonClickHandler = () => {
			if (!isNicknameChange) {
				setChangeNickname(nickname);
				setIsNicknameChange(!isNicknameChange);
				return;
			}
			if (!cookies.accessToken) return;
			const requestBody: PatchNicknameRequestDto = { nickname: changeNickname };
			patchNicknameRequest(requestBody, cookies.accessToken).then(patchNicknameResponse);
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
			fileUploadRequest(data).then(fileUploadResponse);
		};
		const onNicknameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			if (value.length > 30) return;
			setChangeNickname(value);
		}

		// effect
		useEffect(() => {
			if (!userEmail) return;
			getUserRequest(userEmail).then(getUserResponse);
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
		const {
			viewList,
			currentPage,
			totalPage, 
			currentSection,
			totalSection, 
			viewPageList,
			setTotalList,
			goToPage,
			nextPage,
			prevPage,
			goToSection,
			nextSection,
			prevSection,
		} = usePagination<BoardListItem>(5, 5, 'desc'); // itemsPerPage=5, pagesPerSection=5


		// function
		const getUserBoardListResponse = (responseBody: GetUserBoardListResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'NU') {
				alert('존재하지 않는 사용자입니다.');
				navigate(MAIN_PATH());
				return;
			}
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') return;
			const { userBoardList } = responseBody as GetUserBoardListResponseDto;
			setTotalList(userBoardList);
			setCount(userBoardList.length);
		};


		// event handler: side card click event handler
		const onSideCardClickHandler = () => {
			if (isMyPage) navigate(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
			else if (loginUser) navigate(USER_PATH(loginUser.email));
		};


		// effect
		useEffect(() => {
			if (!userEmail) return;
			getUserBoardListRequest(userEmail).then(getUserBoardListResponse);
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
						{viewList.map((boardListItem, index) => (
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
				<div className="user-bottom-pagination-box">
					{count !== 0 && 
						<Pagination
							currentPage={currentPage}
							totalPage={totalPage}
							currentSection={currentSection}
							totalSection={totalSection}
							viewPageList={viewPageList}
							goToPage={goToPage}
							nextPage={nextPage}
							prevPage={prevPage}
							goToSection={goToSection}
							nextSection={nextSection}
							prevSection={prevSection}
						/>
					}
				</div>
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