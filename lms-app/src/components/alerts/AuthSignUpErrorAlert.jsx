import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    useToast,
} from "@chakra-ui/react"
import {authCreator} from '../../redux/authCreator'

export const AuthSignUpErrorAlert = React.memo(()=>{
    const signupError = useSelector(state => state.authReducer.signupError)
    const hasError = signupError ? true:false;

    const dispatch = useDispatch()
    const toast = useToast();
    function Log(){
        
        toast({ status: "error",description: signupError, position:'top' ,duration:2000 })

        dispatch(authCreator.disableSignUpError());
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
