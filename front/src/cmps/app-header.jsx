import { Link } from "react-router-dom"
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export default function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <Link to='/' className="logo-container">
                <LibraryBooksIcon className="logo-icon" />
                <h1>Email</h1>
            </Link>
        </header>
    )
}