import axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { SignInRequestDto, SignUpRequestDto } from './request/auth';
import { SignInResponseDto, SignUpResponseDto } from './response/auth';
import { ResponseDto } from './response';
import { GetSignInUserResponseDto } from './response/user';
import { PatchBoardRequestDto, PostBoardRequestDto, PostCommentRequestDto } from './request/board';
import { PostBoardResponseDto, GetBoardResponseDto, IncreaseViewCountResponseDto, GetFavoriteListResponseDto, GetCommentListResponseDto, PutFavoriteResponseDto, PostCommentResponseDto, DeleteBoardResponseDto, PatchBoardResponseDto, GetLatestBoardListResponseDto, GetTop3BoardListResponseDto } from './response/board';
import { GetPopularListResponseDto } from './response/search';

// --- 기본 설정 ---
const DOMAIN = 'http://localhost:8080';
const API_DOMAIN = `${DOMAIN}/api/v1`;
const FILE_DOMAIN = `${DOMAIN}/file`;

// function: 인증 헤더 생성 함수
const authorizationHeader = (accessToken: string) => ({
    headers: { Authorization: `Bearer ${accessToken}` }
});

// --- Type Guard for ResponseDto ---
// This function checks if the given data looks like a ResponseDto
function isResponseDto(data: any): data is ResponseDto {
    return (
        typeof data === 'object' &&
        data !== null &&
        'code' in data && typeof data.code === 'string' &&
        'message' in data && typeof data.message === 'string'
        // Add checks for other mandatory properties of ResponseDto if any
    );
}

// --- 중앙 API 요청 함수 ---
/**
 * 중앙 집중식 API 요청 함수
 * @param method HTTP 메서드 ('get', 'post', 'put', 'patch', 'delete')
 * @param url 요청 URL
 * @param data 요청 본문 (선택 사항)
 * @param accessToken 액세스 토큰 (선택 사항, 인증 필요 시)
 * @param config 추가 Axios 설정 (선택 사항, 예: multipart/form-data)
 * @returns 성공 시 T 타입의 응답 데이터, 실패 시 ResponseDto 또는 null
 */
const apiRequester = async <T>(
    method: Method,
    url: string,
    data?: any,
    accessToken?: string,
    config?: AxiosRequestConfig
): Promise<T | ResponseDto | null> => {
    const requestConfig: AxiosRequestConfig = {
        method,
        url,
        data,
        ...config, // 기본 설정 병합
    };

    // 액세스 토큰이 있으면 인증 헤더 추가
    if (accessToken) {
        requestConfig.headers = {
            ...requestConfig.headers, // 기존 헤더 유지
            ...authorizationHeader(accessToken).headers
        };
    }

    try {
        const response = await axios(requestConfig);
        const responseBody: T = response.data;
        return responseBody;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            // 응답은 받았지만 성공 상태 코드가 아닌 경우
            if (axiosError.response?.data && isResponseDto(axiosError.response.data)) {
                const responseBody: ResponseDto = axiosError.response.data;
                return responseBody;
            }
            // 응답 자체를 받지 못한 경우 (네트워크 오류 등) 또는 response.data가 없는 경우
            return null;
        }
        // Axios 오류가 아닌 다른 예외
        console.error("An unexpected error occurred:", error);
        return null;
    }
};

// --- URL 팩토리 함수 (기존과 동일) ---
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
const GET_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;
const PATCH_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;
const DELETE_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;
const GET_LATEST_BOARD_LIST_URL = () => `${API_DOMAIN}/board/latest-list`;
const GET_TOP_3_BOARD_LIST_URL = () => `${API_DOMAIN}/board/top-3`;
const POST_COMMENT_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/comment`;
const INCREASE_VIEW_COUNT_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/increase-view-count`;
const GET_FAVORITE_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite-list`;
const GET_COMMENT_LIST_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/comment-list`;
const PUT_FAVORITE_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}/favorite`;
const GET_POPULAR_LIST_URL = () => `${API_DOMAIN}/search/popular-list`;
const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

// API 요청 함수들 
// Auth
export const signInRequest = (requestBody: SignInRequestDto) =>
    apiRequester<SignInResponseDto>('post', SIGN_IN_URL(), requestBody);

export const signUpRequest = (requestBody: SignUpRequestDto) =>
    apiRequester<SignUpResponseDto>('post', SIGN_UP_URL(), requestBody);

// User
export const getSignInUserRequest = (accessToken: string) =>
    apiRequester<GetSignInUserResponseDto>('get', GET_SIGN_IN_USER_URL(), undefined, accessToken);

// Board
export const getBoardRequest = (boardNumber: number | string) =>
    apiRequester<GetBoardResponseDto>('get', GET_BOARD_URL(boardNumber));

export const postBoardRequest = (requestBody: PostBoardRequestDto, accessToken: string) =>
    apiRequester<PostBoardResponseDto>('post', POST_BOARD_URL(), requestBody, accessToken);

export const patchBoardRequest = (boardNumber: number | string, requestBody: PatchBoardRequestDto, accessToken: string) =>
    apiRequester<PatchBoardResponseDto>('patch', PATCH_BOARD_URL(boardNumber), requestBody, accessToken);

export const deleteBoardRequest = (boardNumber: number | string, accessToken: string) =>
    apiRequester<DeleteBoardResponseDto>('delete', DELETE_BOARD_URL(boardNumber), undefined, accessToken);

export const getLatestBoardListRequest = () => 
    apiRequester<GetLatestBoardListResponseDto>('get', GET_LATEST_BOARD_LIST_URL());

export const getTop3BoardListRequest = () => 
     apiRequester<GetTop3BoardListResponseDto>('get', GET_TOP_3_BOARD_LIST_URL());

// Comment & Favorite & View Count
export const postCommentRequest = (boardNumber: number | string, requestBody: PostCommentRequestDto, accessToken: string) =>
    apiRequester<PostCommentResponseDto>('post', POST_COMMENT_URL(boardNumber), requestBody, accessToken);

export const increaseViewCountRequest = (boardNumber: number | string) =>
    apiRequester<IncreaseViewCountResponseDto>('get', INCREASE_VIEW_COUNT_URL(boardNumber));

export const getFavoriteListRequest = (boardNumber: number | string) =>
    apiRequester<GetFavoriteListResponseDto>('get', GET_FAVORITE_LIST_URL(boardNumber));

export const getCommentListRequest = (boardNumber: number | string) =>
    apiRequester<GetCommentListResponseDto>('get', GET_COMMENT_LIST_URL(boardNumber));

export const putFavoriteRequest = (boardNumber: number | string, accessToken: string) =>
    apiRequester<PutFavoriteResponseDto>('put', PUT_FAVORITE_URL(boardNumber), {}, accessToken); // PUT 요청 시 빈 객체 {} 전달

// search
export const getPopularListReqeust = () => 
    apiRequester<GetPopularListResponseDto>('get', GET_POPULAR_LIST_URL());

// File
const multipartFormDataConfig: AxiosRequestConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
export const fileUploadRequest = (data: FormData) =>
    apiRequester<string>('post', FILE_UPLOAD_URL(), data, undefined, multipartFormDataConfig)
        .then(result => {
            // 파일 업로드는 성공 시 문자열 URL만 반환하고, 실패 시 null 반환하는 특성을 유지
            if (typeof result === 'string') {
                return result;
            }
            // ResponseDto가 반환된 경우 (오류지만 서버에서 응답) 또는 null (네트워크 오류 등)
            return null;
		});

/** 
 * refactoring 이전 버전

export const getSignInUserRequest = async (accessToken: string) => {
	const result = await axios.get(GET_SIGN_IN_USER_URL(), authorization(accessToken))
		.then(response => {
			const responseBody: GetSignInUserResponseDto = response.data;
			return responseBody;
		})
		.catch(error => {
			if (!error.response) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		});
	return result;
}

export const signInRequest = async (requestBody: SignInRequestDto) => {
	const result = await axios.post(SIGN_IN_URL(), requestBody)
		.then(response => {
			const responseBody: SignInResponseDto = response.data;
			return responseBody;
		})
		.catch(error => {
			if (!error.response.data) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		})
	return result;
}

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
	const result = await axios.post(SIGN_UP_URL(), requestBody)
		.then(response => {
			const responseBody: SignUpResponseDto = response.data;
			return responseBody;
		})
		.catch(error => {
			if (!error.response.data) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		});
	return result;
}

export const getBoardRequest = async (boardNumber: number | string) => {
	const result = await axios.get(GET_BOARD_URL(boardNumber))
		.then(response => {
			const responseBody: GetBoardResponseDto = response.data;
			return responseBody;
		})
		.catch(error => {
			if (!error.response) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		})
	return result;
}

export const postBoardRequest = async (requestBody: PostBoardRequestDto, accessToken: string) => {
	const result = await axios.post(POST_BOARD_URL(), requestBody, authorization(accessToken))
		.then(response => {
			const responseBody: PostBoardResponseDto = response.data;
			return responseBody;
		})
		.catch(error => {
			if (!error.response) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		})
	return result;
}

export const deleteBoardRequest = async (boardNumber: number | string, accessToken: string) => {
	const result = await axios.delete(DELETE_BOARD_URL(boardNumber), authorization(accessToken))
		.then(response => {
			const responseBody: DeleteBoardResponseDto = response.data;
			return responseBody;
		})
		.catch(error => {
			if (!error.response) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		});
	return result;
}

export const postCommentRequest = async (boardNumber: number | string, requestBody: PostCommentRequestDto, accessToken: string) => {
	const result = await axios.post(POST_COMMENT_URL(boardNumber), requestBody, authorization(accessToken))
		.then(response => {
			const responseBody: PostCommentResponseDto = response.data;
			return responseBody;
		})
		.catch(error => {
			if (!error.response) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		})
	return result;
}

export const patchBoardRequest = async (boardNumber: number | string, requestBody: PatchBoardRequestDto, accessToken: string) => {
	const result = await axios.patch(PATCH_BOARD_URL(boardNumber), requestBody, authorization(accessToken))
		.then(response => {
			const responseBody: PatchBoardResponseDto = response.data;
			return responseBody;
		})
		.catch(error => {
			if (!error.response) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		})
	return result;
}

export const increaseViewCountRequest = async (boardNumber: number | string) => {
	const result = await axios.get(INCREASE_VIEW_COUNT_URL(boardNumber))
		.then(response => {
			const responseBody: IncreaseViewCountResponseDto = response.data;
			return responseBody;
		}).catch(error => {
			if (!error.response) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		})
	return result;
}

export const getFavoriteListRequest = async (boardNumber: number | string) => {
	const result = await axios.get(GET_FAVORITE_LIST_URL(boardNumber))
		.then(response => {
			const responseBody: GetFavoriteListResponseDto = response.data;
			return responseBody;
		}).catch(error => {
			if (!error.response) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		})
	return result;
}
export const getCommentListRequest = async (boardNumber: number | string) => {
	const result = await axios.get(GET_COMMENT_LIST_URL(boardNumber))
		.then(response => {
			const responseBody: GetCommentListResponseDto = response.data;
			return responseBody;
		}).catch(error => {
			if (!error.response) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		})
	return result;
}

export const putFavoriteRequest = async (boardNumber: number | string, accessToken: string) => {
	const result = await axios.put(PUT_FAVORITE_URL(boardNumber), {}, authorization(accessToken))
		.then(response => {
			const responseBody: PutFavoriteResponseDto = response.data;
			return responseBody;
		})
		.catch(error => {
			if (!error.response) return null;
			const responseBody: ResponseDto = error.response.data;
			return responseBody;
		});
	return result;
}

const multipartFormData = { headers: { 'Content-Type': 'multipart/form-data' } };
export const fileUploadRequest = async (data: FormData) => {
	const result = await axios.post(FILE_UPLOAD_URL(), data, multipartFormData)
		.then(response => {
			const responseBody: string = response.data;
			return responseBody;
		}).catch(error => {
			return null;
		})
	return result;
}
*/