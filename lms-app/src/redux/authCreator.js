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
            if(error.message == "Network Error"){
                dispatch(setAuthError(error.message))
            }
            else{
                dispatch(setAuthError(error.response.data.message))
            }
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

const setAuthError = error => {
    return {
        type: actionTypes.SET_AUTH_ERROR,
        payload: { error }
    }
}

const setAuthMessage = message =>{
    return{
        type: actionTypes.SET_AUTH_MESSAGE,
        payload: { message }
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
            if(error.message == "Network Error"){
                dispatch(setAuthError(error.message))
            }
            else{
                dispatch(setAuthError(error.response.data.message))
            }

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

const requestResetPassword = (userObj) => dispatch =>{
    dispatch({
        type: actionTypes.REQUEST_RESET_PASSWORD
    })
    axios({
        method: 'post',
        url: process.env.REACT_APP_REQUEST_RESET_PASSWORD_API,
        data: {
            email:userObj.email
        }
    })
    .then(function (response){
        dispatch({
            type: actionTypes.REQUEST_RESET_PASSWORD_COMPLETE
        })
        dispatch(setAuthMessage(response.data.message))
    })
    .catch(function(error){
        if(error.message == "Network Error"){
            dispatch(setAuthError(error.message))
        }
        else{
            dispatch(setAuthError(error.response.data.message))
        }
    })
}



const resetPassword = (userObj) => dispatch =>{
    dispatch({
        type: actionTypes.RESET_PASSWORD
    })
    axios({
        method:'post',
        url: process.env.REACT_APP_RESET_PASSWORD_API,
        data: {
            email:userObj.email,
            token:userObj.token,
            newPassword:userObj.newPassword
        }
    })
    .then(function(response){
        dispatch({
            type:actionTypes.RESET_PASSWORD_COMPLETE
        })
        console.log(response)
        dispatch(setAuthMessage(response.data.message))
    })
    .catch(function(error){
        if(error.message == "Network Error"){
            dispatch(setAuthError(error.message))
        }
        else{
            dispatch(setAuthError(error.response.data.message))
        }
    })
}

const disableAuthError = () =>{
    return{
        type: actionTypes.DISABLE_AUTH_ERROR
    }
}

const disableAuthMessage = () =>{
    return{
        type: actionTypes.DISABLE_AUTH_MESSAGE
    }
}



export const authCreator = {
    setUser,
    logOut,
    signIn,
    signUp,
    setAuthError,
    disableAuthError,
    requestResetPassword,
    resetPassword,
    disableAuthMessage
}