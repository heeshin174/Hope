import { useState } from 'react'
import './style.css'

export default function Authentication() {

	// state: 화면 상태
	const [view, setView] = useState<'sign-in' | 'sign-up'>();

	// component: sign in card
	const SignInCard = () => {
		return <div></div>
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