import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {authCreator} from '../../../redux/authCreator'
const Home = () => {

    const dispatch = useDispatch();
    
    function handleLogout(){
        dispatch(authCreator.logOut())
    }

    return (
        <div>
            <h1>Home page</h1>
            <h2>Saaam</h2>
            <button onClick={()=>handleLogout()}>Logout</button>
        </div>
    );
}

export default Home;
