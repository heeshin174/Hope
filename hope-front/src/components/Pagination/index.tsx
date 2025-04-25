import './style.css'


// interface: pagination component properties (훅에서 받는 값들)
interface Props {
	currentPage: number;
	totalPage: number; // 전체 페이지 수 추가
	currentSection: number;
	totalSection: number;

	viewPageList: number[];

	// 훅에서 제공하는 네비게이션 함수들
	goToPage: (page: number) => void;
	nextPage: () => void;
	prevPage: () => void;
	goToSection: (section: number) => void;
	nextSection: () => void;
	prevSection: () => void;
}

// props 타입 변경: 훅에서 네비게이션 함수를 받도록 수정
export default function Pagination({
	currentPage,
	totalPage,
	currentSection,
	totalSection,
	viewPageList,
	goToPage,
	nextPage,
	prevPage,
	goToSection,
	nextSection,
	prevSection,
}: Props) {

	return (
		<div id="pagination-wrapper">
			<div className="pagination-change-link-box">
				<div className="icon-box-small">
					<div className="icon expand-left-icon" onClick={prevSection}></div>
				</div>
			</div>
			<div className="pagination-back" onClick={prevPage}>{'이전'}</div>
			<div className="pagination-divider">{'\|'}</div>
			{viewPageList.map(page =>
				<div key={page} className={page === currentPage ? "pagination-text-active" : "pagination-text"}
					onClick={() => goToPage(page)}>
					{page}
				</div>
			)}
			<div className="pagination-divider">{'\|'}</div>
			<div className="pagination-next" onClick={nextPage}>{'다음'}</div>
			<div className="pagination-change-link-box">
				<div className="icon-box-small">
					<div className="icon expand-right-icon" onClick={nextSection}></div>
				</div>
			</div>
		</div>
	)
}