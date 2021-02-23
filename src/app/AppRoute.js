import React, { useContext } from "react";

import { Menu } from './pages/Menu/MenuPage.js';
import { Login } from './pages/Login/LoginPage.js';
import SignUp from './pages/Login/SignUpPage.js'
import { Analytics } from './pages/Analytics/Analytics.js'

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import { UserContext } from "../provider/UserProvider.jsx";



export default function AppRoute() {
  const user = useContext(UserContext)
  return (
    <Router>
      <Switch>
        <Route exact path='/signup'>
          {user ? <Redirect to='/' /> : <SignUp />}
        </Route>
        <Route exact path='/login'>
          {user ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route exact path='/analytics'>
          <Analytics />
        </Route>
        <Route component={Menu} exact path='/menu' />
        <Route component={Menu} exact path='/' />

      </Switch>
    </Router>
  );
}
