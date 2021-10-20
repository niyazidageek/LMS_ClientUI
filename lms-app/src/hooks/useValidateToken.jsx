import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authCreator } from "../redux/authCreator";

export function useValidateToken(){

    const dispatch = useDispatch();
    let expiryDate = useSelector(state=>state.authReducer.jwtExpiryDate);

    useEffect(()=>{
        
        expiryDate = Date.parse(expiryDate);
        let currentDate = new Date;
        if(expiryDate<currentDate.getTime()){
            dispatch(authCreator.logOut());
        }
    });

}