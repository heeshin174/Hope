import { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import './style.css'
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useBoardStore, useLoginUserStore } from 'stores';
import { fileUploadRequest, postBoardRequest } from 'apis';
import { PostBoardRequestDto } from 'apis/request/board';
import { PostBoardResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';

export default function Header() {
	// state: 로그인 유저 상태
	const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
	// state: path 상태
	const { pathname } = useLocation();

	// state: cookie 상태
	const [cookies, setCookies] = useCookies();
	// state: login 상태
	const [isLogin, setLogin] = useState<boolean>(true);

	const isAuthPage = pathname.startsWith(AUTH_PATH());
	const isMainPage = pathname === MAIN_PATH();
	const isSearchPage = pathname.startsWith(SEARCH_PATH(''));
	const isBoardDetailPage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_DETAIL_PATH(''));
	const isBoardWritePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_WRITE_PATH());
	const isBoardUpdatePage = pathname.startsWith(BOARD_PATH() + '/' + BOARD_UPDATE_PATH(''));
	const isUserPage = pathname.startsWith(USER_PATH(''));

	const navigate = useNavigate();

	// event handler: 로고 클릭 이벤트 처리 함수
	const onLogoClickHandler = () => {
		navigate(MAIN_PATH());
	}

	// component: search icon button
	const SearchButton = () => {
		// state: 검색 버튼 요소 참조 상태
		const searchButtonRef = useRef<HTMLDivElement | null>(null);
		// state: 검색어 상태
		const [word, setWord] = useState<string>('');
		// state: 검색어 path variable 상태
		const { searchWord } = useParams();
		// event handler: 검색 버튼 클릭 이벤트 처리 함수
		const onSearchWordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setWord(value);
		};
		// event handler: 검색어 키 이벤트 처리 함수
		const onSearchWordKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key !== 'Enter') return;
			if (!searchButtonRef.current) return;
			searchButtonRef.current.click();
		}

		// event handler: 검색 버튼 클릭 이벤트 처리 함수
		const onSearchButtonClickHandler = () => {
			navigate(SEARCH_PATH(word));
		};

		// effect: 검색어 path variable이 변경 될 때마다 실행
		// 검색 후 검색창에 검색어 유지
		useEffect(() => {
			if (searchWord) { setWord(searchWord); }
		}, [searchWord])

		return (
			<div className="header-search-input-box">
				<input type="text" className="header-search-input" placeholder='Search' value={word} onChange={onSearchWordChangeHandler}
				onKeyDown={onSearchWordKeyDownHandler} />
				<div ref={searchButtonRef} className="icon-button" onClick={onSearchButtonClickHandler}>
					<div className="icon search-light-icon"></div>
				</div>
			</div>
		);
	}

	// component: 로그인 또는 마이페이지 버튼 컴포넌트
	const MyPageButton = () => {

		// state: userEmail path variable 상태
		const { userEmail } = useParams();

		// event handler: 마이페이지 버튼 클릭 이벤트 처리 함수
		const onMyPageButtonClickHandler = () => {
			if (!loginUser) return;
			const { email } = loginUser;
			navigate(USER_PATH(email));
		};
		// event handler: 마이페이지 버튼 클릭 이벤트 처리 함수
		const onSignInButtonClickHandler = () => {
			navigate(AUTH_PATH());
		};
		// event handler: 로그아웃 버튼 클릭 이벤트 처리 함수
		const onSignOutButtonClickHandler = () => {
			resetLoginUser();
			setCookies('accessToken', '', {path: MAIN_PATH(), expires: new Date()})
			navigate(MAIN_PATH());
		};

		if(isLogin && userEmail === loginUser?.email) return <div className="white-button" onClick={onSignOutButtonClickHandler}>{'Log Out'}</div>
		if (isLogin) return <div className="white-button" onClick={onMyPageButtonClickHandler}>{'MyPage'}</div>
		return <div className="black-button" onClick={onSignInButtonClickHandler}>{'login'}</div>
	}

	// effect: login user가 변경될 때마다 실행될 함수
	useEffect(() => {
		setLogin(loginUser !== null) 
	}, [loginUser])

	// component: upload button
	const UploadButton = () => {
		// state: 게시물 상태
		const { title, content, boardImageFileList, resetBoard } = useBoardStore();

		// function: post board response 처리 함수
		const postBoardResponse = (responseBody: PostBoardResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code === 'AF' || code === 'NU') navigate(AUTH_PATH());
			if (code === 'VF') alert('제목과 내용은 필수입니다.');
			if (code !== 'SU') return;
			resetBoard();
			if (!loginUser) return;
			const { email } = loginUser;
			navigate(USER_PATH(email));
		}

		// event handler: 업로드 버튼 클릭 이벤트 처리 함수
		const onUploadButtonClickHandler = async () => {
			const accessToken = cookies.accessToken;
			if (!accessToken) return;
			const boardImageList: string[] = [];
			for (const file of boardImageFileList) {
				const data = new FormData();
				data.append('file', file);
				const url = await fileUploadRequest(data);
				if (url) boardImageList.push(url);
			}
			const requestBody: PostBoardRequestDto = { title, content, boardImageList };
			postBoardRequest(requestBody, accessToken).then(postBoardResponse);
		}

		// render
		if (title && content)
			return <div className="black-button" onClick={onUploadButtonClickHandler}>{'Upload'}</div>
		return <div className="disable-button">{'Upload'}</div>
	}


	return (
		<div id="header">
			<div className="header-container">
				<div className="header-left-box" onClick={onLogoClickHandler}>
					<div className="icon-box">
						<div className="icon logo-dark-icon"></div>
					</div>
					<div className="header-logo">{"HOPE"}</div>
				</div>
				<div className="header-right-box">
					{(isAuthPage || isMainPage || isSearchPage || isBoardDetailPage) && <SearchButton />}
					{(isMainPage || isSearchPage || isBoardDetailPage || isUserPage) && <MyPageButton />}
					{(isBoardWritePage || isBoardUpdatePage) && <UploadButton />}
				</div>
			</div>
		</div>
	)
}