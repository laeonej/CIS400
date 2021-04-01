import React, { useContext, useEffect, useState } from "react";

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
  const [isGuest, setIsGuest] = useState(true)

  useEffect(() => {
    updateGuest()
  })

  function updateGuest() {
    setIsGuest(!(user != null && user != undefined))
  }

  
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
        <Route exact path='/menu'>
          <Menu isGuest={isGuest}/>
        </Route>
        <Route exact path='/'>
        <Menu isGuest={isGuest}/>
        </Route>

      </Switch>
    </Router>
  );
}

