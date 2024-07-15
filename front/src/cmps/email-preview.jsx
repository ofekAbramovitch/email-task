/* eslint-disable react/prop-types */
import { utilService } from "../services/util.service"

export default function EmailPreview({ email }) {
    const sentDate = new Date(email.sentAt);
    const hour = sentDate.getHours()
    const minutes = sentDate.getMinutes().toString().padStart(2, '0');

    function getInitials(name) {
        return name.split(' ').map(word => word[0]).join('').toUpperCase()
    }

    const senderImgStyle = {
        backgroundColor: utilService.getRandomColor()
    }

    return (
        <article className="email-preview">
            <div className="sender-img" style={senderImgStyle}>{getInitials(email.fromName)}</div>
            <div className="text">
                <h2 className="from-name">{email.fromName}</h2>
                <h2 className="subject">{email.subject}</h2>
                <p>{email.body}</p>
            </div>
            <p className="time">{`${hour}:${minutes}`}</p>
        </article>
    )
}