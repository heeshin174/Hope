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
import { Address, useDaumPostcodePopup } from 'react-daum-postcode';

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
		// state
		const emailRef = useRef<HTMLInputElement | null>(null);
		const passwordRef = useRef<HTMLInputElement | null>(null);
		const passwordCheckRef = useRef<HTMLInputElement | null>(null);
		const nicknameRef = useRef<HTMLInputElement | null>(null);
		const telNumberRef = useRef<HTMLInputElement | null>(null);
		const addressRef = useRef<HTMLInputElement | null>(null);
		const addressDetailRef = useRef<HTMLInputElement | null>(null);

		const [page, setPage] = useState<1 | 2>(2);
		const [email, setEmail] = useState<string>('');
		const [password, setPassword] = useState<string>('');
		const [passwordCheck, setPasswordCheck] = useState<string>('');
		const [nickname, setNickname] = useState<string>('');
		const [telNumber, setTelNumber] = useState<string>('');
		const [address, setAddress] = useState<string>('');
		const [addressDetail, setAddressDetail] = useState<string>('');
		const [agreedPersonal, setAgreedPersonal] = useState<boolean>(false);
		
		const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
		const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');
		const [isEmailError, setEmailError] = useState<boolean>(false);
		const [isPasswordError, setPasswordError] = useState<boolean>(false);
		const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);
		const [isNicknameError, setNicknameError] = useState<boolean>(false);
		const [isTelNumberError, setTelNumberError] = useState<boolean>(false);
		const [isAddressError, setAddressError] = useState<boolean>(false);
		const [isAgreedPersonalError, setAgreedPersonalError] = useState<boolean>(false);

		const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
		const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
		const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
		const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
		const [telNumberErrorMessage, setTelNumberErrorMessage] = useState<string>('');
		const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');
		
		const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon')
		const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon')

		// function: Daum 주소 검색 pop-up 함수 (react-daum-postcode)
		const open = useDaumPostcodePopup();

		// event handler
		const onEmailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setEmail(value);
			setEmailError(false);
			setEmailErrorMessage('');
		}
		const onPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setPassword(value);
			setPasswordError(false);
			setPasswordErrorMessage('');
		}
		const onPasswordCheckChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setPasswordCheck(value);
			setPasswordCheckError(false);
			setPasswordCheckErrorMessage('');
		}
		const onNicknameChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setNickname(value);
			setNicknameError(false);
			setNicknameErrorMessage('');
		}
		const onTelNumberChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setTelNumber(value);
			setTelNumberError(false);
			setTelNumberErrorMessage('');
		}
		const onAddressChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setAddress(value);
			setAddressError(false);
			setAddressErrorMessage('');
		}
		const onAddressDetailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setAddressDetail(value);
		}
		const onAgreedPersonalClickHandler = () => {
			setAgreedPersonal(!agreedPersonal);
			setAgreedPersonalError(false);
		}
		const onPasswordButtonClickHandler = () => {
			if (passwordButtonIcon === 'eye-light-off-icon') {
				setPasswordButtonIcon('eye-light-on-icon');
				setPasswordType('text');
			} else {
				setPasswordButtonIcon('eye-light-off-icon');
				setPasswordType('password');
			}
		}
		const onPasswordCheckButtonClickHandler = () => {
			if (passwordCheckButtonIcon === 'eye-light-off-icon') {
				setPasswordCheckButtonIcon('eye-light-on-icon');
				setPasswordCheckType('text');
			} else {
				setPasswordCheckButtonIcon('eye-light-off-icon');
				setPasswordCheckType('password');
			}
		}
		const onAddressButtonClickHandler = () => {
			open({ onComplete });
		}
		const onNextButtonClickHandler = () => {
			const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
			const isEmailPattern = emailPattern.test(email);
			if (!isEmailPattern) {
				setEmailError(true);
				setEmailErrorMessage('이메일 주소 포멧이 맞지 않습니다.');
			}
			const isCheckedPassword = password.trim().length >= 8;
			if (!isCheckedPassword) {
				setPasswordError(true);
				setPasswordErrorMessage('비밀번호는 8자 이상 입력해주세요.');
			}
			const isEqualPassword = password === passwordCheck;
			if (!isEqualPassword) {
				setPasswordCheckError(true);
				setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
			}
			if (!isEmailPattern || !isCheckedPassword || !isEqualPassword) return;
			setPage(2);
		}
		const onSignUpButtonClickHandler = () => {
			alert('회원가입 중입니다.');
		}
		const onSignInLinkClickHandler = () => {
			setView('sign-in');
		}
		
		const onEmailKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key !== 'Enter') return;
			if (!passwordRef.current) return;
			passwordRef.current.focus();
		}
		const onPasswordKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key !== 'Enter') return;
			if (!passwordCheckRef.current) return;
			passwordCheckRef.current.focus();
		}
		const onPasswordCheckKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key !== 'Enter') return;
			if (!nicknameRef.current) return;
			onNextButtonClickHandler();
			nicknameRef.current.focus();
		}
		const onNicknameKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key !== 'Enter') return;
			if (!telNumberRef.current) return;
			telNumberRef.current.focus();
		}
		const onTelNumberKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key !== 'Enter') return;
			onAddressButtonClickHandler();
		}
		const onAddressKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key !== 'Enter') return;
			if (!addressDetailRef.current) return;
			addressDetailRef.current.focus();
		}
		const onAddressDetailKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key !== 'Enter') return;
			onSignUpButtonClickHandler();
		}
		// event handler: Daum 주소 검색 완료 이벤트 처리
		const onComplete = (data: Address) => {
			const { address } = data;
			setAddress(address);
			if (!addressDetailRef.current) return;
			addressDetailRef.current.focus();
		}


		return (
			<div className="auth-card">
				<div className="auth-card-box">
					<div className="auth-card-top">
						<div className="auth-card-title-box">
							<div className="auth-card-title">{"Sign Up"}</div>
							<div className="auth-card-page">{`${page}/2`}</div>
						</div>
						{page === 1 && (
							<>
								<InputBox ref={emailRef} label='email' type='text' placeholder='email' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage}
									onKeyDown={onEmailKeyDownHandler} />
								<InputBox ref={passwordRef} label='password' type={passwordType} placeholder='password' value={password} onChange={onPasswordChangeHandler}
							error={isPasswordError} message={passwordErrorMessage} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler}
									onKeyDown={onPasswordKeyDownHandler} />
								<InputBox ref={passwordCheckRef} label='password check' type={passwordCheckType} placeholder='password' value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError}
							message={passwordCheckErrorMessage} icon={passwordCheckButtonIcon} onButtonClick={onPasswordCheckButtonClickHandler} onKeyDown={onPasswordCheckKeyDownHandler} />
							</>
						)}
						{page === 2 && (
							<>
								<InputBox ref={nicknameRef} label='Nick name' type='text' placeholder='닉네임을 입력해주세요.' value={nickname} onChange={onNicknameChangeHandler} error={isNicknameError} message={nicknameErrorMessage}
								onKeyDown={onNicknameKeyDownHandler}/>
								<InputBox ref={telNumberRef} label='Telephone number' type='text' placeholder='전화번호를 입력해주세요.' value={telNumber} onChange={onTelNumberChangeHandler} error={isTelNumberError}
									message={telNumberErrorMessage} onKeyDown={onTelNumberKeyDownHandler}/>
								<InputBox ref={addressRef} label='Address' type='text' placeholder='우편번호 찾기' value={address} onChange={onAddressChangeHandler} error={isAddressError}
									message={addressErrorMessage} icon='expand-right-light-icon' onButtonClick={onAddressButtonClickHandler}
								onKeyDown={onAddressKeyDownHandler} />
								<InputBox ref={addressDetailRef} label='Address Detail' type='text' placeholder='상세 주소를 입력해주세요.' value={addressDetail} onChange={onAddressDetailChangeHandler} error={false}
								onKeyDown={onAddressDetailKeyDownHandler} />
							</>
						)}
					</div>
					<div className="auth-card-bottom">
						{page === 1 && (
							<div className="black-large-full-button" onClick={onNextButtonClickHandler}>{'Next'}</div>
						)}
						{page === 2 && (
							<>
								<div className="auth-consent-box">
									<div className="auth-check-box" onClick={onAgreedPersonalClickHandler}>
										<div className={`icon ${agreedPersonal ? 'check-round-fill-icon' : 'check-ring-light-icon'}`}></div>
									</div>
									<div className={isAgreedPersonalError ? "auth-consent-title-error" : "auth-consent-title"}>{'개인정보동의'}</div>
									<div className="auth-consent-link">{'더보기 >'}</div>
								</div>
								<div className="black-large-full-button" onClick={onSignUpButtonClickHandler}>{'Sign Up'}</div>
							</>
						)}
						<div className="auth-description-box">{"Already have account?"}&nbsp;&nbsp;
							<span className="auth-description-link" onClick={onSignInLinkClickHandler}>{"Sign In"}</span>
						</div>
					</div>
				</div>
			</div>
		)

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