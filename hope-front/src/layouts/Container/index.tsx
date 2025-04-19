import Header from 'layouts/Header'
import './style.css'
import Footer from 'layouts/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { AUTH_PATH } from 'constant';

export default function Container() {

	// 현재 path name
	const { pathname } = useLocation();

	return (
		<>
			<Header />
			<Outlet />
			{pathname !== AUTH_PATH() && <Footer />}
		</>
	)
}