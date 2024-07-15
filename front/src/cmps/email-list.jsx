/* eslint-disable react/prop-types */
import { memo, useState } from "react"
import EmailPreview from "./email-preview"

const EmailList = memo(function _EmailList({ emails, onSelectEmail }) {
    const [activeEmailId, setActiveEmailId] = useState(null)

    return (
        <ul className="email-list">
            {emails.map(email => (
                <li key={email._id}
                    className={email._id === activeEmailId ? 'active' : ''}
                    onClick={() => {
                        setActiveEmailId(email._id)
                        onSelectEmail(email)
                    }}>
                    <EmailPreview email={email} />
                </li>
            ))}
        </ul>
    )
})

export default EmailList
