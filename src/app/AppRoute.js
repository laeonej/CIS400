import React from "react";

import { Menu } from './pages/Menu/MenuPage.js';
import { Login } from './pages/Login/LoginPage.js';
import { Temp } from './Temp.js';
import { Game } from './Game.js';
import { Card } from './Card.js';
// import { Lobby } from './Lobby.js'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


export default function AppRoute() {
  return (
    <Router>
      {/* <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/menu'>Menu</Link>
              </li>
            </ul>
          </nav> */}
      <Switch>
        <Route component={Login} exact path='/login' />
        <Route component={Menu} exact path='/menu' />
        {/* <Route component={Lobby} exact path='/lobby' /> */}
        <Route component={Game} exact path='/game' />
        <Route component={Card} exact path='/card' />
        <Route component={Temp} exact path='/' />

      </Switch>
      {/* </div> */}
    </Router>
  );
}