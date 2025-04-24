import axios from 'axios';
import { SignInRequestDto, SignUpRequestDto } from './request/auth';
import { SignInResponseDto, SignUpResponseDto } from './response/auth';
import { ResponseDto } from './response';
import { GetSignInUserResponseDto } from './response/user';
import { PostBoardRequestDto } from './request/board';
import { PostBoardResponseDto } from './response/board';
import GetBoardResponseDto from './response/board/get-board.response.dto';

const DOMAIN = 'http://localhost:8080';
const API_DOMAIN = `${DOMAIN}/api/v1`;
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
const authorization = (accessToken: string) => {
	return { headers: { Authorization: `Bearer ${accessToken}` } }
};

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

const GET_BOARD_URL = (boardNumber: number | string) => `${API_DOMAIN}/board/${boardNumber}`;
const POST_BOARD_URL = () => `${API_DOMAIN}/board`;

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

const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
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

const FILE_DOMAIN = `${DOMAIN}/file`;
const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;
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