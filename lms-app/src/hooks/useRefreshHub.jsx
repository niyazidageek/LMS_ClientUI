import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../actions/const";

export function useRefreshHub(){

    const dispatch = useDispatch();
    let token = useSelector(state=>state.authReducer.jwt);

    useEffect(()=>{
        if(token!=null || token !=undefined){
            dispatch({
                type:actionTypes.REFRESH_HUB,
                payload:token
            });
        }
    });

}