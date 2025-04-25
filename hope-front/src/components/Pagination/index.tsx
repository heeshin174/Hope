import { Dispatch, SetStateAction } from 'react';
import './style.css'


// interface: pagination component properties
interface Props {
	currentPage: number;
	currentSection: number;
	setCurrentPage: Dispatch<SetStateAction<number>>;
	setCurrentSection: Dispatch<SetStateAction<number>>;

	viewPageList: number[];
	totalSection: number;
}

export default function Pagination(props: Props) {

	// state: properties
	const { currentPage, currentSection, viewPageList, totalSection } = props;
	const { setCurrentPage, setCurrentSection } = props;

	// function
	const onPageClickHandler = (page: number) => {
	}
	const onPrevClickHandler = () => {
		console.log(viewPageList);
		console.log(currentSection);
		if (currentPage === 1) return;
		setCurrentPage((currentSection - 1) * 10);
		setCurrentSection(currentSection - 1);
	}

	const onNextClickHandler = () => {
		if (currentPage === totalSection) return;
		setCurrentPage(currentSection  * 10 +1);
		setCurrentSection(currentSection + 1);
	}

	return (
		<div id="pagination-wrapper">
			<div className="pagination-change-link-box">
				<div className="icon-box-small">
					<div className="icon expand-left-icon"></div>
				</div>
				<div className="pagination-change-link-text" onClick={onPrevClickHandler}>{"이전"}</div>
			</div>
			<div className="pagination-divider">{'\|'}</div>
			{viewPageList.map(page => page === currentPage ?
				<div className="pagination-text-active">{page}</> :
				<div className="pagination-text" onClick={() => onPageClickHandler(page)}>{page}</div>
			)}
			<div className="pagination-divider">{'\|'}</div>
			<div className="pagination-change-link-box">
				<div className="pagination-change-link-text" onClick={onNextClickHandler}>{"다음"}</div>
				<div className="icon-box-small">
					<div className="icon expand-right-icon"></div>
				</div>
			</div>
		</div>
	)
}