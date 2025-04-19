import { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './style.css'
import { AUTH_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';

export default function Header() {
	// state: 로그인 유저 상태
	const { loginUser, setLoginUser, resetLoginUser } = useLoginUserStore();
	// state: cookie 상태
	const [cookies, setCookies] = useCookies();
	// state: login 상태
	const [isLogin, setLogin] = useState<boolean>(true);


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
			navigate(MAIN_PATH());
		};

		if(isLogin && userEmail === loginUser?.email) return <div className="white-button" onClick={onSignOutButtonClickHandler}>{'Log Out'}</div>
		if (isLogin) return <div className="white-button" onClick={onMyPageButtonClickHandler}>{'MyPage'}</div>
		return <div className="black-button" onClick={onSignInButtonClickHandler}>{'login'}</div>
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
					<SearchButton />
					<MyPageButton />
				</div>
			</div>
		</div>
	)
}