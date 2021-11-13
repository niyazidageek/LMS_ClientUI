import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logOutAction } from '../../../actions/authActions';
import { useValidateToken } from '../../../hooks/useValidateToken';
const Home = () => {
    useValidateToken()
    const dispatch = useDispatch();
    const[count, setCount] = useState(0);
    function handleLogout(){
        dispatch(logOutAction())
    }

    function handleIncrement(){
        setCount(count+1);
    }

    return (
        console.log('render'),
        
        <div>
            {/* <h1>Home pagee</h1>
            <button onClick={()=>handleIncrement()}>Increment</button>
            <h1>Counter: {count}</h1>
            <h2>Saaam</h2>
            <button onClick={()=>handleLogout()}>Logout</button> */}
        </div>
    );
}

export default Home;
