import './App.css';
import React from 'react';
import AppRoute from './AppRoute.js'
import UserProvider from '../provider/UserProvider'

function App() {
  return (
    <UserProvider>
      <AppRoute />
    </UserProvider>
    
  );
}

export default App;
