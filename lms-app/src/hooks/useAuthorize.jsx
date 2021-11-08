import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export function useAuthorize(validRoles){

    const [isAuthorized, setIsAuthorized] = useState(true);

    let roles = useSelector(state=>state.authReducer.roles);

    useEffect(()=>{
        
        if(validRoles!=undefined){
            
            let authorized = roles.some(role=>{
                let check = validRoles.some(vr=>{
                    return vr == role
                })
                return check
            })

            setIsAuthorized(authorized);
        }
    });
    return isAuthorized
}