import React, { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
import MovieList from '../views/movie'
import Login from '../views/login'
import {UserProvider} from '../context/user-context'
import GameList from '../views/games'
import RegisterForm from '../views/register'
import HomeView from '../views/home'
import {UserContext} from '../context/user-context'
import SingleMovie from '../views/single-movie'
import SingleMovieEdit from '../views/single-movie-edit'
import axios from "axios"

  const HeaderNav = () => {

    const [user,setUser] = useContext(UserContext);

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
        <Router>
         <Route>
        <header>
        <ul>
            <li>
                <Link className="menus" to="/home">Home</Link>
            </li>
           
            { user ?
                <>
                 <li>
                <Link className="menus" to="/movie">Movie</Link>
                </li>
                <li>
                    <Link to="/games">Games</Link>
                </li>
                </>
                : <></>
             }
            { user ?  <></> :
            <>
            <li>
                 <Link className="menus" to="/register">Register</Link>
                </li>
            <li>
                 <Link className="menus" to="/login">Login</Link>
            </li></>  }
            {user ?<li>
                 <Link className="menus" to="/login" onClick={Logout}>Logout</Link>
                </li> : <></> }

        
        </ul>
        </header>
        
        </Route>
        <Switch>
            <Route exact path="/home">
              <HomeView/>
            </Route>
            <PrivateRoute exact path="/movie" user={user}>
              <MovieList/>
            </PrivateRoute>
            <PrivateRoute exact path="/movie/:id" user={user}>
              <SingleMovie/>
            </PrivateRoute>
            <PrivateRoute exact path="/movie/edit/:id" user={user}>
              <SingleMovieEdit/>
            </PrivateRoute>
            <Route exact path="/games">
                <GameList />
            </Route>
            <LoginRoute exact path="/register" user={user}>
              <RegisterForm />
            </LoginRoute>
            <LoginRoute exact path="/login" user={user}>
              <Login />
            </LoginRoute>
          </Switch>
        </Router>
       
      )
  
    
  }
  export default HeaderNav