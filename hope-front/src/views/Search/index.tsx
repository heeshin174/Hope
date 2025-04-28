import { useNavigate, useParams } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react';
import BoardItem from 'components/BoardItem';
import { BoardListItem } from 'types/interface';
import { SEARCH_PATH } from 'constant';
import { getRelationListRequest, getSearchBoardListRequest } from 'apis';
import { GetSearchBoardListResponseDto } from 'apis/response/board';
import { usePagination } from 'hooks';
import { ResponseDto } from 'apis/response';
import Pagination from 'components/Pagination';
import { GetRelationListResponseDto } from 'apis/response/search';

export default function Search() {

	// state: searchWord path variable 상태
	const { searchWord } = useParams();
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
	const [preSearchWord, setPreSearchWord] = useState<string | null>(null);
	const [count, setCount] = useState<number>(0);
	const [relativeWordList, setRelativeWordList] = useState<string[]>([]);

	// function
	const navigate = useNavigate();
	const getSearchBoardListResponse = (responseBody: GetSearchBoardListResponseDto | ResponseDto | null) => {
		if (!responseBody) return;
		const { code } = responseBody;
		if (code === 'DBE') alert('데이터베이스 오류입니다.')
		if (code !== 'SU') return;

		if (!searchWord) return;
		const { searchList } = responseBody as GetSearchBoardListResponseDto;
		setTotalList(searchList);
		setCount(searchList.length);
		setPreSearchWord(searchWord);
	}
	const getRelationListResponse = (responseBody: GetRelationListResponseDto | ResponseDto | null) => {
		if (!responseBody) return;
		const { code } = responseBody;
		if (code === 'DBE') alert('데이터베이스 오류입니다.')
		if (code !== 'SU') return;

		if (!searchWord) return;
		const { relativeWordList } = responseBody as GetRelationListResponseDto;
		setRelativeWordList(relativeWordList);
	}

	// event handler
	const onRelationWordClickHandler = (relation: string) => {
		navigate(SEARCH_PATH(relation));
	}

	// effect
	useEffect(() => {
		if (!searchWord) return;
		getSearchBoardListRequest(searchWord, preSearchWord).then(getSearchBoardListResponse);
		getRelationListRequest(searchWord).then(getRelationListResponse);
	},[searchWord]);

	if (!searchWord) return <></>
	return (
		<div className="search-wrapper">
			<div className="search-container">
				<div className="search-title-box">
					<div className="search-title"><span className='search-title-emphasis'>{searchWord}</span>{'에 대한 검색결과 입니다.'}</div>
					<div className="search-count">{count}</div>
				</div>
				<div className="search-contents-box">
					{count === 0 ?
						<div className="search-contents-nothing">{'검색 결과가 없습니다.'}</div> :
						<div className="search-contents">{viewList.map((boardListItem, index) => <BoardItem key={index} boardListItem={boardListItem} />)}</div>
					}
					<div className="search-relation-box">
						<div className="search-relation-card">
							<div className="search-relation-card-container">
								<div className="search-relation-card-title">{'관련 검색어'}</div>
								{relativeWordList.length === 0 ?
									<div className="search-relation-card-contents-nothing">{'연관 검색어가 없습니다.'}</div> :
									<div className="search-relation-card-contents">
										{relativeWordList.map((relation, index) => <div key={index} className="word-badge" onClick={() => onRelationWordClickHandler(relation)}>{relation}</div>)}
									</div>
								}
							</div>
						</div>
					</div>
				</div>
				<div className="search-pagination-box">
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