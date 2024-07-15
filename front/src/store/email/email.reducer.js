export const SET_EMAILS = "SET_EMAILS"
export const ADD_EMAIL = "ADD_EMAIL"
export const UPDATE_EMAIL = "UPDATE_EMAIL"
export const REMOVE_EMAIL = "REMOVE_EMAIL"
export const SET_FILTER_BY = "SET_FILTER_BY"

const initialState = {
    emails: [],
    filterBy: {
        subject: '',
        status: ''
    }
}

export function emailReducer(state = initialState, action) {
    let emails
    switch (action.type) {
        case SET_EMAILS:
            return { ...state, emails: action.emails }
        case ADD_EMAIL:
            return { ...state, emails: [...state.emails, action.email] }
        case UPDATE_EMAIL:
            emails = state.emails.map(email =>
                (email._id === action.email._id) ? action.email : email)
            return { ...state, emails }
        case REMOVE_EMAIL:
            emails = state.emails.filter(email => email._id !== action.emailId)
            return { ...state, emails }
        case SET_FILTER_BY:
            return { ...state, filterBy: action.filterBy }
        default:
            return state
    }
}