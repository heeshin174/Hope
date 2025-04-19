import { ChangeEvent, useRef, useState, KeyboardEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './style.css'
import { MAIN_PATH, SEARCH_PATH } from 'constant';

export default function Header() {

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
	const LoginMyPageButton = () => {
		return <div className="black-button">{'login'}</div>
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
					<LoginMyPageButton />
				</div>
			</div>
		</div>
	)
}