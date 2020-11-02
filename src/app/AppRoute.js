import React from "react";

import { Menu } from './pages/Menu/MenuPage.js';
import { Login } from './pages/Login/LoginPage.js';
import { Temp } from './Temp.js';
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
            <Route component={Login} exact path='/login'/>
            <Route component={Menu} exact path='/menu'/>
            <Route component={Temp} exact path='/'/>
  
          </Switch>
        {/* </div> */}
      </Router>
    );
  }