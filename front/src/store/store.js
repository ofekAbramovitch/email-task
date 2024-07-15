import { combineReducers, legacy_createStore as createStore } from 'redux'
import { userReducer } from './user/user.reducer'
import { emailReducer } from './email/email.reducer'

const rootReducer = combineReducers({
    userModule: userReducer,
    emailModule: emailReducer
})

const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)
