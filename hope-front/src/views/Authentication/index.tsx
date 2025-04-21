import { useRef, useState } from 'react'
import './style.css'
import InputBox from 'components/InputBox';

export default function Authentication() {

	// state: 화면 상태
	const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');

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

		// event handler: 로그인 버튼 클릭
		const onSignInButtonClickHandler = () => {
			
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
						<InputBox ref={emailRef} label='email address' type='text' placeholder='email address' value={email} setValue={setEmail} error={error}
						onKeyDown={onEmailKeyDownHandler} />
						<InputBox ref={passwordRef} label='password' type={passwordType} placeholder='password' value={password} setValue={setPassword} error={error}
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