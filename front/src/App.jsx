import { Route, Routes } from "react-router"
import AppHeader from "./cmps/app-header"
import HomePage from "./pages/home-page"
import LoginSignup from "./pages/login-signup"
import EmailIndex from "./pages/email-index"

export default function App() {

	return (
		<section className="app main-layout">
			<AppHeader />
			<main className="main-container full">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path='/auth/login' element={<LoginSignup />} />
					<Route path='/auth/signup' element={<LoginSignup />} />
					<Route path='/email' element={<EmailIndex />} />
				</Routes>
			</main>
		</section>
	)
}

