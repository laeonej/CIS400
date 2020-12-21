import React from "react";

import { Menu } from './pages/Menu/MenuPage.js';
import { Login } from './pages/Login/LoginPage.js';
import SignUp from './pages/Login/SignUpPage.js'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


export default function AppRoute() {
  return (
    <Router>
      <Switch>
        <Route component={SignUp} exact path='/signup' />
        <Route component={Login} exact path='/login' />
        <Route component={Menu} exact path='/menu' />
        <Route component={Menu} exact path='/' />

      </Switch>
    </Router>
  );
}
