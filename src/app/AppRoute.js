import React from "react";

import { Menu } from './pages/Menu/MenuPage.js';
import { Login } from './pages/Login/LoginPage.js';
<<<<<<< HEAD
=======
import { Temp } from './Temp.js';
import { Lobby } from './Lobby.js';

>>>>>>> 81b7224b83c8a8b591d985dbb76bc044959813c9
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


export default function AppRoute() {
<<<<<<< HEAD
    return (
      <Router>
          <Switch>
            <Route component={Login} exact path='/login'/>
            <Route component={Menu} exact path='/'/>
  
          </Switch>
      </Router>
    );
  }
=======
  return (
    <Router>
      <Switch>
        <Route component={Login} exact path='/login' />
        <Route component={Menu} exact path='/menu' />
        <Route component={Temp} exact path='/lobby' />
        <Route component={Lobby} exact path='/' />

      </Switch>
    </Router>
  );
}
>>>>>>> 81b7224b83c8a8b591d985dbb76bc044959813c9
