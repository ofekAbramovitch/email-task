import { useEffect } from "react"
import { useSelector } from 'react-redux'
import { loadEmails } from "../store/email/email.actions"

export default function EmailIndex() {
    const emails = useSelector(storeState => storeState.emailModule.emails)

    useEffect(() => {
        loadEmails()
    }, [])

    console.log(emails)

    return (
        <section className="email-index">
            <h1>Email Index</h1>
        </section>
    )
}