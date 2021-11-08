import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { useAuthorize } from "../hooks/useAuthorize";

export const PrivateRoute = ({
  component: Component,
  rolesRestriction: rolesRestriction,
  ...rest
}) => {
  const validRoles = rolesRestriction;

  const isLoggedIn = useSelector(
    (state) => state.authReducer.isLoggedIn && state.authReducer.jwt !== null
  );

  const roles = useSelector((state) => state.authReducer.roles);

  const isAuthorized = useAuthorize(validRoles);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn === true && isAuthorized === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};