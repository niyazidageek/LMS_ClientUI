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
import ConfirmationSuccess from "./components/pages/EmailConfirmation/ConfirmationSuccess";


function App() {

  return (
    <>
    <Router>
          <Switch>
            <ChakraProvider>
              <PrivateRoute exact path="/home" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/requestresetpassword" component={RequestResetPassword}/>
              <Route exact path="/resetpassword" component={ResetPassword}/>
              <Route exact path="/confirmationsuccess/:id/:token" component={ConfirmationSuccess} />
            </ChakraProvider>
          </Switch>
      </Router>
    </>
  );
}

export default App;
