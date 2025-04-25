import dayjs from 'dayjs';

// function: 작성일 경과시간 함수
export const getElapsedTime = (writeDateTime: string) => {
	// writeDatetime을 dayjs 객체로 변환
	const writeTime = dayjs(writeDateTime);

	// dayjs 객체가 유효한지 확인하는 것도 좋습니다.
  	if (!writeTime.isValid()) {
		console.error(`Invalid date string provided: ${writeDateTime}`);
		// 또는 에러를 던지거나, 기본값을 반환할 수 있습니다.
		return '알 수 없음';
  	}

	// 현재 시간과의 상대적인 시간 반환 (예: "3분 전", "2시간 전", "5일 전", "1년 전")
	return writeTime.fromNow();
}