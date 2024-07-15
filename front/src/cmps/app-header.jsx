import { Link } from "react-router-dom"
import MailOutlineIcon from '@mui/icons-material/MailOutline'

export default function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <Link to='/' className="logo-container">
                <MailOutlineIcon className="logo-icon" />
                <h1>Email</h1>
            </Link>
        </header>
    )
}