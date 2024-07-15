import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import InboxIcon from '@mui/icons-material/Inbox'
import OutboxIcon from '@mui/icons-material/Outbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import EmailIcon from '@mui/icons-material/Email'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import SendIcon from '@mui/icons-material/Send'
import { TextField } from "@mui/material"
import { saveEmail } from "../store/email/email.actions"

export default function EmailHeader() {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState({ to: '', subject: '', body: '' })

    const handleOpen = () => setOpen(true)

    const handleClose = () => setOpen(false)

    const handleChange = ({ target }) => {
        const { name: field, value } = target
        setEmail(prevState => ({ ...prevState, [field]: value }))
    }

    const onSendEmail = () => {
        try {
            saveEmail({ ...email })
            handleClose()
        } catch (err) {
            console.log(err)
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: '1rem',
    }

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
            <button className="new-email" onClick={handleOpen}><EmailIcon />New Email</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <button className="send-btn" onClick={onSendEmail}>Send <SendIcon /></button>
                    <TextField
                        label="To"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="to"
                        value={email.to}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Subject"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="subject"
                        value={email.subject}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Body"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        name="body"
                        value={email.body}
                        onChange={handleChange}
                    />
                </Box>
            </Modal>
        </header>
    )
}