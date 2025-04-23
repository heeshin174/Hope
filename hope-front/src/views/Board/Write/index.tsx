import { useEffect, useRef, useState } from 'react';
import './style.css'
import { useBoardStore } from 'stores';

export default function BoardWrite() {

	// state: 본문 영역 요소 참조 상태
	const contentRef = useRef<HTMLTextAreaElement | null>(null);
	const imageInputRef = useRef<HTMLInputElement | null>(null);

	// state: 게시물 상태 
	const { title, setTitle } = useBoardStore();
	const { content, setContent } = useBoardStore();
	const { boardImageFileList, setBoardImageFileList } = useBoardStore();
	const { resetBoard } = useBoardStore();
	// state: 게시물 이미지 미리보기 URL 상태
	const [imageUrls, setImageUrls] = useState<string[]>([]);

	// effect: mount 시 실행될 함수
	useEffect(() => {
		resetBoard();
	}, [])

	return (
		<div className="board-write-wrapper">
			<div className="board-write-container">
				<div className="board-write-box">
					<div className="board-write-title-box">
						<input type="text" className="board-write-title-input" placeholder='제목을 작성해주세요.' value={title} />
					</div>
					<div className="divider"></div>
					<div className="board-write-content-box">
						<textarea ref={contentRef} value={content} className="board-write-content-textarea" placeholder='본문을 작성해주세요.' />
						<div className="icon-button">
							<div className="icon image-box-light-icon"></div>
						</div>
						<input ref={imageInputRef} type="file" accept='image/' style={{ display: 'none' }} />
					</div>
					<div className="board-write-images-box">
						<div className="board-write-iamge-box">
							<img src="" alt="" className="board-write-img" />
							<div className="icon-button image-close">
								<div className="icon close-icon"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
				
		</div>
	)
}