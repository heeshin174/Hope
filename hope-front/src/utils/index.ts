import { getElapsedTime } from './date.util';
export { getElapsedTime };

// function: 이미지 URL을 File 객체로 변환하는 함수
// 주어진 이미지 URL로부터 이미지를 다운로드하여 웹에서 파일처럼 다룰 수 있는 File 객체로 변환
// 이 함수를 사용하여 서버에 이미지를 업로드하거나, 이미지 미리보기를 구현하는 등의 작업을 할 수 있습니다.
export const convertUrlToFile = async (url: string) => { 
	const response = await fetch(url);
	const data = await response.blob();
	const extend = url.split('.').pop();
	const fileName = url.split('/').pop();
	const meta = { type: `image/${extend}` };

	return new File([data], fileName as string, meta);
}

export const convertUrlsToFile = async (urls: string[]) => { 
	const files: File[] = [];
	for (const url of urls) {
		const file = await convertUrlToFile(url);
		files.push(file);
	}
	
	return files;
}