import { httpService } from "./http.service.js"

const BASE_URL = 'email/'

export const emailService = {
    query,
    getById,
    remove,
    save,
    getEmptyEmail,
    getEmptyFilterBy
}

function query(filterBy = getEmptyFilterBy()) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(emailId) {
    return httpService.get(BASE_URL + emailId)
}

function remove(emailId) {
    return httpService.delete(BASE_URL + emailId)
}

function save(email) {
    if (email._id) return httpService.put(BASE_URL + email._id, email)
    else return httpService.post(BASE_URL, email)
}

function getEmptyEmail() {
    return {
        from: "", //sender email
        fromName: "", //sender name
        to: "",
        subject: "",
        body: "",
        isRead: false,
        status: "", //inbox, sent, draft
        sentAt: Date.now(),
    }
}

function getEmptyFilterBy() {
    return {
        subject: "",
    }
}