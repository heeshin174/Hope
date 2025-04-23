import { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css'
import { useBoardStore } from 'stores';
import { useNavigate } from 'react-router-dom';
import { MAIN_PATH } from 'constant';
import { useCookies } from 'react-cookie';

export default function BoardWrite() {

	// state: 본문 영역 요소 참조 상태
	const titleRef = useRef<HTMLTextAreaElement | null>(null);
	const contentRef = useRef<HTMLTextAreaElement | null>(null);
	const imageInputRef = useRef<HTMLInputElement | null>(null);

	// state: 게시물 상태 
	const { title, setTitle } = useBoardStore();
	const { content, setContent } = useBoardStore();
	const { boardImageFileList, setBoardImageFileList } = useBoardStore();
	const { resetBoard } = useBoardStore();
	const [cookies, setCookies] = useCookies();
	// state: 게시물 이미지 미리보기 URL 상태
	const [imageUrls, setImageUrls] = useState<string[]>([]);

	// function: 네비게이트 함수
	const navigate = useNavigate();

	// event handler: 제목 변경 이벤트 처리
	const onTitleChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setTitle(value);
		if (!titleRef.current) return;
		titleRef.current.style.height = 'auto';
		titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
	}
	const onContentChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setContent(value);

		if (!contentRef.current) return;
		contentRef.current.style.height = 'auto';
		contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
	}
	const onImageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || !e.target.files.length) return;
		const file = e.target.files[0];
		const imageUrl = URL.createObjectURL(file);
		const newImageUrls = imageUrls.map(item => item);
		newImageUrls.push(imageUrl);
		setImageUrls(newImageUrls);

		const newBoardImageFileList = boardImageFileList.map(item => item);
		newBoardImageFileList.push(file);
		setBoardImageFileList(newBoardImageFileList);

		if (!imageInputRef.current) return;
		imageInputRef.current.value = "";
	}
	const onImageUploadButtonClickHandler = () => {
		if (!imageInputRef.current) return;
		imageInputRef.current.click();
	}
	const onImageCloseButtonClickHandler = (deleteIndex: number) => {
		if (!imageInputRef.current) return;
		imageInputRef.current.value = "";

		const newImageUrls = imageUrls.filter((url, index) => index !== deleteIndex);
		setImageUrls(newImageUrls);

		const newBoardImageFileList = boardImageFileList.filter((file, index) => index !== deleteIndex);
		setBoardImageFileList(newBoardImageFileList);
	}

	// effect: mount 시 실행될 함수
	useEffect(() => {
		const accessToken = cookies.accessToken;
		if (!accessToken) {
			navigate(MAIN_PATH());
			return;
		}
		resetBoard();
	}, [])

	return (
		<div id="board-write-wrapper">
			<div className="board-write-container">
				<div className="board-write-box">
					<div className="board-write-title-box">
						<textarea ref={titleRef} className="board-write-title-textarea" rows={1} placeholder='제목을 작성해주세요.' value={title} onChange={onTitleChangeHandler} />
					</div>
					<div className="divider"></div>
					<div className="board-write-content-box">
						<textarea ref={contentRef} value={content} className="board-write-content-textarea" placeholder='본문을 작성해주세요.' onChange={onContentChangeHandler} />
						<div className="icon-button" onClick={onImageUploadButtonClickHandler}>
							<div className="icon image-box-light-icon"></div>
						</div>
						<input ref={imageInputRef} type="file" accept='image/' style={{ display: 'none' }} onChange={onImageChangeHandler} />
					</div>
					<div className="board-write-images-box">
						{imageUrls.map((imageUrl, index) => (
							<div className="board-write-image-box">
								<img src={imageUrl} alt="" className="board-write-img" />
								<div className="icon-button image-close" onClick={() => onImageCloseButtonClickHandler(index)}>
									<div className="icon close-icon"></div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
				
		</div>
	)
}