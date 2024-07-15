/* eslint-disable react/prop-types */

export default function EmailDetails({ email }) {
    const formattedSentAt = new Date(email.sentAt).toLocaleString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })

    return (
        <section className="email-details">
            <div className="heading">
                <div className="info">
                    <h2>{email.fromName}</h2>
                    <p className="to">To: {email.to}</p>
                    <h2>{email.subject}</h2>
                </div>
                <p>{formattedSentAt}</p>
            </div>
            <div className="body-container">
                <p>{email.body}</p>
            </div>
        </section>
    )
}