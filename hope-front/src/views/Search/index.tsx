import { useNavigate, useParams } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react';
import { latestBoardListMock } from 'mocks';
import BoardItem from 'components/BoardItem';
import { BoardListItem } from 'types/interface';
import { SEARCH_PATH } from 'constant';

export default function Search() {

	// state: searchWord path variable 상태
	const { searchWord } = useParams();
	const [count, setCount] = useState<number>(0);
	const [searchBoardList, setSearchBoardList] = useState<BoardListItem[]>([]);
	const [relationList, setRelationList] = useState<string[]>([]);

	// function
	const navigate = useNavigate();

	// event handler
	const onRelationWordClickHandler = (relation: string) => {
		navigate(SEARCH_PATH(relation));
	}

	// effect
	useEffect(() => {
		setSearchBoardList(latestBoardListMock);
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
						<div className="search-contents">{searchBoardList.map((boardListItem, index) => <BoardItem key={index} boardListItem={boardListItem} />)}</div>
					}
					<div className="search-relation-box">
						<div className="search-relation-card">
							<div className="search-relation-card-container">
								<div className="search-relation-card-title">{'관련 검색어'}</div>
								{relationList.length === 0 ?
									<div className="search-relation-card-contents-nothing">{'연관 검색어가 없습니다.'}</div> :
									<div className="search-relation-card-contents">
										{relationList.map((relation, index) => <div key={index} className="word-badge" onClick={() => onRelationWordClickHandler(relation)}>{relation}</div>)}
									</div>
								}
							</div>
						</div>
					</div>
				</div>
				<div className="search-pagination-box">
					{count !== 0 && <div className="d"></div>}
				</div>
			</div>
		</div>
		
	)
}