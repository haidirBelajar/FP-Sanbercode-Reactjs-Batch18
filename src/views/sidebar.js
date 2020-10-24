import React, { useContext } from 'react';
import { Layout, Menu } from 'antd'
import {UserOutlined} from 'antd'
import {UserContext} from '../context/user-context'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";

const {Sider} = Layout  

const SidebarMenu = () => {
    const [user,setUser] = useContext(UserContext);
    return(
        <Sider className="sidebar">
            <Menu>
                <Router>
                <Route>    
                <Link to="movie">MOVIE</Link>
                </Route>
                </Router>
            </Menu>
        </Sider>
    )
}
export default SidebarMenu