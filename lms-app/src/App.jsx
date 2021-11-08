import React, { useEffect } from "react";
import axios from 'axios'
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {PrivateRoute} from "./utils/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Register/Register";
import RequestResetPassword from "./components/pages/RequestResetPassword/RequestResetPassword";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import ConfirmEmail from "./components/pages/EmailConfirmation/ConfirmEmail";
import { useValidateToken } from "./hooks/useValidateToken";
import { roles } from "./utils/roles";


function App() {
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const userRoles = useSelector((state) => state.authReducer.roles);
  
  useValidateToken();

  return (
    <>
    <Router>
          <Switch>
            <ChakraProvider>
            <Route
              exact
              path="/"
              render={() => {
                return isLoggedIn ? (
                  userRoles.some(r=>r==roles.Teacher || r==roles.SuperAdmin || r==roles.Admin)?
                  <Redirect to="/teacher/home"/> :
                  <Redirect to="/student/home"/>
                ) : (
                  <Redirect to="/login" />
                );
              }}
            />

             
             <Route path="/student">
                <PrivateRoute exact path="/student/home" 
                  rolesRestriction={[roles.Student]}
                  component={Home}
                  />
             </Route>

             <Route path="/teacher">
              <PrivateRoute exact path="/teacher/home" 
                rolesRestriction={[roles.Teacher, roles.Admin, roles.SuperAdmin]}
                component={Home}
                />
             </Route>

              

              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/requestresetpassword" component={RequestResetPassword}/>
              <Route path="/resetpassword" component={ResetPassword}/>
              <Route path="/confirmemail/:id/:token" component={ConfirmEmail} />
            </ChakraProvider>
          </Switch>
      </Router>
    </>
  );
}

export default App;
