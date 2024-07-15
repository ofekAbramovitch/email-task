import { Link } from 'react-router-dom'
import hero from '../assets/imgs/animation.mp4'

export default function HomePage() {


    return (
        <section className="home-page main-layout">
            <div className="hero main-layout full">
                <video className='full' autoPlay muted loop playsInline>
                    <source src={hero} type="video/mp4" />
                </video>
                <div className="hero-container">
                    <h1 className="hero-title">Secure email, <br /> ready to use</h1>
                    <Link className='login-btn' to={'/auth/login'}>
                        Get started
                    </Link>
                </div>
            </div>
        </section>
    )
}