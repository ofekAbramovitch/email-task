/* eslint-disable react/prop-types */


export default function EmailDetails({ email }) {
    

    return (
        <section className="email-details">
            <h2>{email.fromName}</h2>
            <p>{email.to}</p>
            <h2>{email.subject}</h2>
            <p>{email.body}</p>
            {/* <p>{email.sentAt}</p> */}
        </section>
    )
}