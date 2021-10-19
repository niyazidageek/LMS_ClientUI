import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    useToast,
} from "@chakra-ui/react"
import {authCreator} from '../../redux/authCreator'

export const AuthSignInErrorAlert = React.memo(()=>{
    const signinError = useSelector(state => state.authReducer.loginError)
    const hasError = signinError ? true:false;

    const dispatch = useDispatch()
    const toast = useToast();
    function Log(){
        
        toast({ status: "error",description: signinError, position:'top' ,duration:2000 })

        dispatch(authCreator.disableSignInError());
    }

    return(
        console.log('render'),
        <>
            {
                hasError ? Log() : null
            }

        </>
    )
})