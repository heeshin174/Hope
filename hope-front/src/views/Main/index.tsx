import Top3Item from 'components/TopItem'
import './style.css'
import { BoardListItem } from 'types/interface'
import { useEffect, useState } from 'react';
import BoardItem from 'components/BoardItem';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from 'constant';
import { getLatestBoardListRequest, getTop3BoardListRequest, getPopularListRequest } from 'apis';
import { GetLatestBoardListResponseDto, GetTop3BoardListResponseDto } from 'apis/response/board';
import { ResponseDto } from 'apis/response';
import { usePagination } from 'hooks';
import Pagination from 'components/Pagination';
import { GetPopularListResponseDto } from 'apis/response/search';

export default function Main() {

	// function: 네비게이트 함수
	const navigate = useNavigate();

	// component: 메인 화면 상단 컴포넌트
	const MainTop = () => {

		// state: 주간 top3 게시물 리스트
		const [top3BoardList, setTop3BoardList] = useState<BoardListItem[]>([]);
	
		// function
		const getTop3BoardListResponse = (responseBody: GetTop3BoardListResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') return;

			const { top3List } = responseBody as GetTop3BoardListResponseDto;
			setTop3BoardList(top3List);
		}

		// effect: 컴포넌트 마운트 시 주간 top3 게시물 리스트 가져오기
		useEffect(() => { 
			getTop3BoardListRequest().then(getTop3BoardListResponse);
		}, []);

		return (
			<div className="main-top-wrapper">
				<div className="main-top-container">
					<div className="main-top-title">{"HOPE board에서 \n다양한 이야기를 나눠요"}</div>
					<div className="main-top-contents-box">
						<div className="main-top-contents-title">{"주간 TOP 3 게시글"}</div>
						<div className="main-top-contents">
							{top3BoardList.map((top3ListItem, index) => (
								<Top3Item key={index} top3ListItem={top3ListItem} />
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}

	// component: 메인 화면 하단 컴포넌트
	const MainBottom = () => {

		// state: 최신 게시물 리스트
		const [popularWordList, setPopularWordList] = useState<string[]>([]);
		const {
			viewList,
			currentPage,
			totalPage, 
			currentSection,
			totalSection, 
			viewPageList,
			setTotalList,
			// 훅에서 반환하는 네비게이션 함수들
			goToPage,
			nextPage,
			prevPage,
			goToSection,
			nextSection,
			prevSection,
		} = usePagination<BoardListItem>(5, 5, 'desc'); // itemsPerPage=5, pagesPerSection=5

		// function
		const getLatestBoardListResponse = (responseBody: GetLatestBoardListResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') return;
			
			const { latestList } = responseBody as GetLatestBoardListResponseDto;
			setTotalList(latestList);
		}
		const getPopularWordListResponse = (responseBody: GetPopularListResponseDto | ResponseDto | null) => {
			if (!responseBody) return;
			const { code } = responseBody;
			if (code === 'DBE') alert('데이터베이스 오류입니다.');
			if (code !== 'SU') return;
			
			const { popularWordList } = responseBody as GetPopularListResponseDto;
			setPopularWordList(popularWordList);
		}

		// event handler: 인기 검색어 클릭 시 해당 검색어로 게시물 검색하기
		const onPopularWordClickHandler = (word: string) => {
			navigate(SEARCH_PATH(word));
		}

		// effect: 컴포넌트 마운트 시 주간 top3 게시물 리스트 가져오기
		useEffect(() => { 
			getLatestBoardListRequest().then(getLatestBoardListResponse);
			getPopularListRequest().then(getPopularWordListResponse);
		}, []);

		return (
			<div className="main-bottom-wrapper">
				<div className="main-bottom-container">
					<div className="main-bottom-title">{'최신 게시물'}</div>
					<div className="main-bottom-contents-box">
						<div className="main-bottom-current-contents">
							{viewList.map((boardListItem, index) => <BoardItem key={index} boardListItem={boardListItem} />)}
						</div>
						<div className="main-bottom-popular-box">
							<div className="main-bottom-popular-card">
								<div className="main-bottom-popular-card-container">
									<div className="main-bottom-popular-card-title">{"인기 검색어"}</div>
									<div className="main-bottom-popular-card-contents">
										{popularWordList.map((word, index) => (
											<div key={index} className="word-badge" onClick={() => onPopularWordClickHandler(word)}>{word}</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="main-bottom-pagination-box">
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
					</div>
				</div>
			</div>
		)
	}

	return (
		<>
			<MainTop />
			<MainBottom />
		</>
	)
}