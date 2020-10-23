import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import HeaderNav from './nav-and-routes/header-nav'
import RouterNav from './nav-and-routes/nav-routes'
import { UserProvider } from './context/user-context'

function App() {
  return (
    <div className="App">
        <UserProvider>
          <HeaderNav />
        </UserProvider>
    </div>
  );
}

export default App;
