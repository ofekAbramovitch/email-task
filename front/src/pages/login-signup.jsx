import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { loadUsers, login, signup } from "../store/user/user.actions"


export default function LoginSignup() {
    const [credentials, setCredentials] = useState({ email: '', password: '', firstName: '', lastName: '' })
    const [isSignup, setIsSignup] = useState(false)
    const users = useSelector(storeState => storeState.userModule.users)
    const navigate = useNavigate()

    useEffect(() => {
        if (!users.length) loadUsers()
    }, [])

    async function onSubmit(ev, isSignup) {
        ev.preventDefault()
        if (!credentials.email || !credentials.password) return
        let user = null
        if (isSignup) {
            if (!credentials.email) return

            try {
                user = await signup(credentials)
            } catch (err) {
                console.log('Cannot signup', err)
            }
        } else {
            try {
                user = await login(credentials)
            } catch (err) {
                console.log('Cannot login', err)
            }
        }
        
        if (user) {
            navigate('/email')
        }
    }

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials({ ...credentials, [field]: value })
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    return (
        <section className="login-signup">
            <form action="" className="form-container" onSubmit={ev => onSubmit(ev, isSignup)}>
                <h1>{isSignup ? 'Sign-up' : 'Welcome'}</h1>
                {isSignup && (
                    <div className="name-container">
                        <div className="first-name-container">
                            <p>First name</p>
                            <input type="text" name="firstName" value={credentials.firstName}
                                onChange={handleChange} placeholder="Enter your first name" required autoFocus />
                        </div>
                        <div className="last-name-container">
                            <p>Last name</p>
                            <input type="text" name="lastName" value={credentials.lastName}
                                onChange={handleChange} placeholder="Enter your last name" required />
                        </div>
                    </div>
                )}
                <div className="email-container">
                    <p>Email</p>
                    <input type="email" name="email" value={credentials.email}
                        onChange={handleChange} placeholder="Enter your email" required autoFocus />
                </div>
                <div className="password-container">
                    <p>Password</p>
                    <input type="password" name="password" value={credentials.password}
                        onChange={handleChange} placeholder="Enter your password" required />
                </div>
                {isSignup && (
                    <div className="repeat-password-container">
                        <p>Repeat password</p>
                        <input type="password" name="password" value={credentials.password}
                            onChange={handleChange} placeholder="Enter your password again" required />
                    </div>
                )}
                <button className="login-signup-btn">{isSignup ? 'Sign-up' : 'Login'}</button>
                <div className="suggest-signup">
                    <span className="prefix">{isSignup ? 'Already have an account?' : 'Don\'t have an account yet?'}</span>
                    {!isSignup && <Link to={'/auth/signup'}><button className="btn-signup" onClick={toggleSignup}>Sign-up</button></Link>}
                    {isSignup && <Link to={'/auth/login'}><button className="btn-signup" onClick={toggleSignup}>Login</button></Link>}
                </div>
            </form>
        </section>
    )
}