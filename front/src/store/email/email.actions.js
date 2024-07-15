import { emailService } from "../../services/email.service"
import { store } from "../store"
import { ADD_EMAIL, REMOVE_EMAIL, SET_EMAILS, SET_FILTER_BY, UPDATE_EMAIL } from "./email.reducer"

export async function loadEmails(filterBy) {
    try {
        const emails = await emailService.query(filterBy)
        store.dispatch({ type: SET_EMAILS, emails })
    } catch (err) {
        console.log(err)
    }
}

export async function removeEmail(emailId) {
    try {
        await emailService.remove(emailId)
        store.dispatch({ type: REMOVE_EMAIL, emailId })
    } catch (error) {
        console.log("error:", error)
    }
}

export async function saveEmail(email) {
    const type = (email._id) ? UPDATE_EMAIL : ADD_EMAIL
    try {
        const newEmail = await emailService.save(email)
        store.dispatch({ type, email: newEmail })
    } catch (err) {
        console.error('cant save code block:', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
    store.dispatch(loadEmails())
}