import React from "react";
import axios from 'axios'
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import {PrivateRoute} from "./utils/PrivateRoute";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home/Home";
import Register from "./components/pages/Register/Register";


function App() {

  return (
    <>
    <Router>
          <Switch>
            <ChakraProvider>
              <PrivateRoute exact path="/home" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
            </ChakraProvider>
          </Switch>
      </Router>
    </>
  );
}

export default App;
