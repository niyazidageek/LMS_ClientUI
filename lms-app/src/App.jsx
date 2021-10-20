import React from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {PrivateRoute} from "./utils/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Register/Register";
import RequestResetPassword from "./components/pages/RequestResetPassword/RequestResetPassword";
import ResetPassword from "./components/pages/ResetPassword/ResetPassword";
import ConfirmEmail from "./components/pages/EmailConfirmation/ConfirmEmail";


function App() {

  return (
    <>
    <Router>
          <Switch>
            <ChakraProvider>
              <PrivateRoute exact path="/" component={Home}/>
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
