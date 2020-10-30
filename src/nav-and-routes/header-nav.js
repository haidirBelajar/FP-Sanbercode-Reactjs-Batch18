import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/context'
import {
    BrowserRouter as Router ,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
import HomeView from '../views/home';
import LoginForm from '../views/login'
import RegisterForm from '../views/register'
import 'antd/dist/antd.css';
import MenuItem from 'antd/lib/menu/MenuItem';
import MovieView from '../views/movie'
import GameView from '../views/games'
import SingleMovie from '../views/single-movie'
import SingleMovieEdit from '../views/single-movie-edit'
import SGames from '../views/single-games'
import SingleGameEdit from '../views/single-game-edit';
import ChangePassword from '../views/change_password';

const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;

  const HeaderNav = () => {

    const [user,setUser] = useContext(UserContext);
    const { SubMenu } = Menu;


    const PrivateRoute = ({ user, ...props }) => {
      return user ? <Route {...props} /> : <Redirect to="/login" />;
    };
    const LoginRoute = ({ user, ...props }) => {
      return user ? <Redirect to="/home" /> : <Route {...props} />;
    };

    const Logout = () =>{
      localStorage.clear();
      setUser(null);
    }
      return(
        <Layout>
            <Router>
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to="/">Home</Link>
                        </Menu.Item>
                        { user ? <></> : <>
                        <Menu.Item key="2">
                            <Link to="/register">Register</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/login">Login</Link>
                        </Menu.Item>
                        </> }
                    </Menu>
                </Header>
               <Content>
               <Layout className="site-layout-background">
                    <Sider className="site-layout-background" width={150}>
                    {user ? <>
                    <Menu
                        mode="inline"
                        style={{ height: '100%' }}
                    >
                     
                        <SubMenu key="sub1" icon={<UserOutlined />} title={user.name}>
                        <Menu.Item key="1">
                            <Link to="/change_password">
                                Change Password
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                          <Link to="/login" onClick={Logout}>Logout</Link>
                        </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="Movie">
                        <Menu.Item key="3">
                            <Link to="/movie">Movie</Link>
                        </Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<NotificationOutlined />} title="Games">
                        <Menu.Item key="4">
                            <Link to="/games">Game</Link>
                        </Menu.Item>
                        </SubMenu>
                    </Menu>
                    </> : <></> }
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Switch>
                            <Route exact path="/">
                                <HomeView/>
                            </Route>
                            <Route exact path="/register">
                                <RegisterForm />
                            </Route>
                            <Route exacth path="/login">
                                <LoginForm />
                            </Route>
                            <Route exacth path="/change_password">
                                <ChangePassword />
                            </Route>
                            <Route exact path="/movie">
                                <MovieView />
                            </Route>
                            <Route exact path="/movie/:id" user={user}>
                              <SingleMovie />
                            </Route>
                            <Route exact path="/movie/edit/:id">
                                <SingleMovieEdit />
                            </Route>
                            <Route exact path="/games">
                                <GameView />
                            </Route>
                            <Route exact path="/games/:id" user={user}>
                              <SGames />
                            </Route>
                            <Route exact path="/games/edit/:id">
                                <SingleGameEdit />
                            </Route>
                        </Switch>
                    </Content>
                 </Layout>
            </Content>
               
            </Router>
        </Layout>
      )
    
  }
  export default HeaderNav