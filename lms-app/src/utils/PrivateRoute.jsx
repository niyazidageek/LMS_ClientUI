import React from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn && state.authReducer.jwt !== null)

    return (
        <Route {...rest} render={(props) => (
            isLoggedIn === true
              ? <Component {...props} />
              : <Redirect to='/login' />
          )} />
    );
}

