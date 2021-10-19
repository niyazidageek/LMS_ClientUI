import { actionTypes } from "./actionTypes"

const initialState = {
    profileName: null,
    isLoggedIn: false,
    isFetching: false,
    jwt: null,
    jwtExpiryDate:null,
    loginError: null,
    signupError: null
}

const authReducer = ( state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                profileName: action.payload.email,
                isLoggedIn: true,
                isFetching: false,
                jwt: action.payload.token,
                loginError: null
            }
        case actionTypes.LOG_OUT:
            return initialState
        case actionTypes.SIGN_IN:
            return {
                ...state,
                isFetching: true,
                loginError: null
            }
        case actionTypes.SIGN_UP:
            return {
                ...state,
                signupError:null,
                isFetching: true    
            }
        case actionTypes.SIGN_UP_COMPLETE:
            return {
                ...state,
                isFetching: false,
                signupError: null
            }
        case actionTypes.SIGN_IN_COMPLETE:
            return {
                ...state,
                isFetching: false,
                loginError: null
            }
        case actionTypes.SET_SIGN_IN_ERROR:
            return {
                ...state,
                isFetching: false,
                loginError: action.payload.error
            }
        case actionTypes.SET_SIGNUP_ERROR:
            return {
                ...state,
                isFetching: false,
                signupError: action.payload.error
            }
        case actionTypes.DISABLE_SIGNUP_ERROR:
            return{
                ...state,
                isFetching:false,
                signupError:null
            }
        case actionTypes.DISABLE_SIGNIN_ERROR:
            return{
                ...state,
                isFetching:false,
                loginError:null
            }
        default:
            return state
    }
}

export default authReducer;