import {actionTypes} from './actionTypes';
import axios from 'axios';

const {} = process.env

const signIn = (userObj) => dispatch => {
    dispatch({
        type: actionTypes.SIGN_IN
    })
    axios({
        method: 'post',
        url: process.env.REACT_APP_LOGIN_API,
        data: {
            email: userObj.email,
            password: userObj.password
        }
    })
        .then(function (response) {
            // handle success
            console.log(response)
            dispatch(setUser({
                email: userObj.email,
                jwt: response.data.token
            }))
            dispatch({
                type: actionTypes.SIGN_IN_COMPLETE
            })
        })
        .catch(function (error) {
            // handle error
            console.log(error.response.data.message)
            dispatch(setLoginError(error.response.data.message))
        })
        .then(function () {
            // always executed
        })
}

const setUser = userObj => {
    return {
        type: actionTypes.SET_USER,
        payload: userObj
    }
}

const setLoginError = error => {
    return {
        type: actionTypes.SET_SIGN_IN_ERROR,
        payload: { error }
    }
}

const setSignupError = error => {
    return {
        type: actionTypes.SET_SIGNUP_ERROR,
        payload: { error }
    }
}

const signUp = (userObj) => dispatch => {
    dispatch({
        type: actionTypes.SIGN_UP
    })
    axios({
        method: 'post',
        url: process.env.REACT_APP_REGISTER_API,
        data: {
            name: userObj.name,
            surname: userObj.surname,
            email:userObj.email,
            username: userObj.username,
            password: userObj.password
        }
    })
        .then(function (response) {
            console.log(response)
            // handle success
            dispatch(signIn(userObj))
        })
        .catch(function (error) {
            // handle error
            console.log(userObj)
            console.log(error.response)
            dispatch(setSignupError(error.response.data.message))

        })
        .then(function () {
            // always executed
        })
}

const logOut = () => {
    return {
        type: actionTypes.LOG_OUT
    }
}

const disableSignUpError = () =>{
    return{
        type: actionTypes.DISABLE_SIGNUP_ERROR
    }
}


const disableSignInError = () =>{
    return{
        type: actionTypes.DISABLE_SIGNIN_ERROR
    }
}


export const authCreator = {
    setUser,
    logOut,
    signIn,
    signUp,
    setLoginError,
    setSignupError,
    disableSignUpError,
    disableSignInError  
}