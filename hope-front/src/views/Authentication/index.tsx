import { ChangeEvent, useRef, useState } from 'react'
import './style.css'
import InputBox from 'components/InputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { SignInResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { signInRequest } from 'apis';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

export default function Authentication() {

	// state: 화면 상태
	const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
	// state: 쿠키 상태
	const [cookies, setCookies] = useCookies();

	// function: navigator 함수
	const navigator = useNavigate();

	// component: sign in card
	const SignInCard = () => {
		// state
		const [email, setEmail] = useState<string>('');
		const [password, setPassword] = useState<string>('');
		const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
		const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon')
		const [error, setError] = useState<boolean>(false);
		const emailRef = useRef<HTMLInputElement | null>(null);
		const passwordRef = useRef<HTMLInputElement | null>(null);

		// function: sign in response 처리
		const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
			if (!responseBody) {
				alert('네트워크 이상입니다.');
				return;
			}
			const { code } = responseBody;
			if (code === 'DBE') alert('데이터베이스 오류입니다.')
			if (code === 'SF' || code === 'VF') setError(true);
			if (code !== 'SU') return;

			const { token, expirationTime } = responseBody as SignInResponseDto;
			const now = new Date().getTime();
			// 초 단위를 ns 단위로 변경
			const expires = new Date(now + expirationTime * 1000); 

			setCookies('accessToken', token, { expires, path: MAIN_PATH() });
			navigator(MAIN_PATH());
		}

		// event handler: email 변경 이벤트
		const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			setError(false);
			const { value } = e.target;
			setEmail(value);
		}
		// event handler: password 변경 이벤트
		const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			setError(false);
			const { value } = e.target;
			setPassword(value);
		}

		// event handler: 로그인 버튼 클릭
		const onSignInButtonClickHandler = () => {
			const requestBody: SignInRequestDto = { email, password };
			signInRequest(requestBody).then(signInResponse);
		}
		// event handler: 회원가입 링크 클릭
		const onSignUpLinkClickHandler = () => {
			setView('sign-up');
		}
		// event handler: password 버튼 클릭
		const onPasswordButtonClickHandler = () => {
			if (passwordType === 'text') {
				setPasswordType('password');
				setPasswordButtonIcon('eye-light-off-icon');
			} else {
				setPasswordType('text');
				setPasswordButtonIcon('eye-light-on-icon');
			}
		}
		const onEmailKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key !== 'Enter') return;
			if (!passwordRef.current) return;
			passwordRef.current.focus();
		}
		const onPasswordKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key !== 'Enter') return;
			onSignInButtonClickHandler();
		}

		// render
		return (
			<div className="auth-card">
				<div className="auth-card-box">
					<div className="auth-card-top">
						<div className="auth-card-title-box">
							<div className="auth-card-title">{'login'}</div>
						</div>
						<InputBox ref={emailRef} label='email address' type='text' placeholder='email address' value={email} onChange={onEmailChangeHandler} error={error}
						onKeyDown={onEmailKeyDownHandler} />
						<InputBox ref={passwordRef} label='password' type={passwordType} placeholder='password' value={password} onChange={onPasswordChangeHandler} error={error}
							icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} onKeyDown={onPasswordKeyDownHandler} />
					</div>
					<div className="auth-card-bottom">
						{error && 
							<div className="auth-sign-in-error-box">
								<div className="auth-sign-in-error-message">{"정보가 일치하지 않습니다 \n다시 입력해 주세요."}</div>
						</div>}
						<div className="black-large-full-button" onClick={onSignInButtonClickHandler}>{ "Sign In" }</div>
						<div className="auth-description-box">{"New User?"}&nbsp;&nbsp;
							<span className="auth-description-link" onClick={onSignUpLinkClickHandler}>{"Sign Up"}</span>
						</div>
					</div>
				</div>
			</div>
		)
	}

	// component: sign up card
	const SignUpCard = () => {
		return <div></div>

	}


	return (
		<div id="auth-wrapper" className="auth-background">
			<div className="auth-container">
				<div className="auth-jumbotron-box">
					<div className="auth-jumbotron-contents">
						<div className="auth-logo-icon auth-icon"></div>
						<div className="auth-jumbotron-text-box">
							<div className="auth-jumbotron-text">{"Welcome to the"}</div>
							<div className="auth-jumbotron-text">{ "HOPE Community" }</div>
						</div>
					</div>
				</div>
				{view === 'sign-in' && <SignInCard />}
				{view === 'sign-up' && <SignUpCard />}
			</div>
		</div>
	)
}