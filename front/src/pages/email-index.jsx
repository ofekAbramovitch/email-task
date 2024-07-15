/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useLocation } from "react-router"
import { loadEmails } from "../store/email/email.actions"
import EmailList from "../cmps/email-list"
import EmailHeader from "../cmps/email-header"
import { emailService } from "../services/email.service"
import EmailDetails from "../cmps/email-details"

export default function EmailIndex() {
    const emails = useSelector(storeState => storeState.emailModule.emails)
    const [filterBy, setFilterBy] = useState(emailService.getEmptyFilterBy())
    const [selectedEmail, setSelectedEmail] = useState(emailService.getEmptyEmail())
    const location = useLocation()

    useEffect(() => {
        const updateFilterBy = () => {
            const path = location.pathname
            let status = ''
            switch (path) {
                case '/email/inbox':
                    status = 'inbox'
                    break
                case '/email/sent':
                    status = 'sent'
                    break
                case '/email/draft':
                    status = 'draft'
                    break
                default:
                    status = ''
            }
            setFilterBy({ ...filterBy, status })
        }

        updateFilterBy()
    }, [location.pathname])

    useEffect(() => {
        loadEmails(filterBy)
    }, [filterBy])

    return (
        <>
            <EmailHeader />
            <section className="email-index">
                <EmailList emails={emails} onSelectEmail={setSelectedEmail} />
                <EmailDetails email={selectedEmail} />
            </section>
        </>
    )
}