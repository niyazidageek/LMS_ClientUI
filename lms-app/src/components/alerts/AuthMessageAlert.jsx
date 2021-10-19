import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
    useToast,
} from "@chakra-ui/react"
import {authCreator} from '../../redux/authCreator'

export const AuthMessageAlert = React.memo(()=>{
    const message = useSelector(state => state.authReducer.message)
    const hasMessage = message ? true:false;

    const dispatch = useDispatch()
    const toast = useToast();
    function Log(){
        
        toast({ status: "success",description: message, position:'top' ,duration:2000 })

        dispatch(authCreator.disableAuthMessage());
    }

    return(
        <>
            {
                hasMessage ? Log() : null
            }

        </>
    )
})