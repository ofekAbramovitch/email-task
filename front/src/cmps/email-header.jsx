import { Link, NavLink } from "react-router-dom"
import InboxIcon from '@mui/icons-material/Inbox'
import OutboxIcon from '@mui/icons-material/Outbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import EmailIcon from '@mui/icons-material/Email'

export default function EmailHeader() {

    return (
        <header className="email-header full main-layout">
            <div className="links">
                <Link to='/'>
                    <MailOutlineIcon className="logo-icon" />
                </Link>
                <NavLink to="/email/inbox"><InboxIcon />Inbox</NavLink>
                <NavLink to="/email/sent"><OutboxIcon />Outbox</NavLink>
                <NavLink to="/email/draft"><DraftsIcon />Draft</NavLink>
            </div>
            <button className="new-email"><EmailIcon />New Email</button>
        </header>
    )
}