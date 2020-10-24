import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import HeaderNav from './nav-and-routes/header-nav'
import RouterNav from './nav-and-routes/nav-routes'
import { UserProvider } from './context/user-context'
import Footer from './views/footer'
import FooterView from './views/footer';
import { Layout } from 'antd'
import SidebarMenu from './views/sidebar'

function App() {
  return (
    <div >
        <UserProvider>
          <HeaderNav />
          <FooterView />
        </UserProvider>
    </div>
  );
}

export default App;
