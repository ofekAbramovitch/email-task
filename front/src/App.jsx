import { Route, Routes } from "react-router"
import HomePage from "./pages/home-page"
import LoginSignup from "./pages/login-signup"
import EmailIndex from "./pages/email-index"

export default function App() {

	return (
		<section className="app main-layout">
			<main className="main-container full">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path='/auth/login' element={<LoginSignup />} />
					<Route path='/auth/signup' element={<LoginSignup />} />
					<Route path='/email/sent' element={<EmailIndex />} />
					<Route path='/email/draft' element={<EmailIndex />} />
					<Route path='/email/inbox' element={<EmailIndex />} />
				</Routes>
			</main>
		</section>
	)
}

