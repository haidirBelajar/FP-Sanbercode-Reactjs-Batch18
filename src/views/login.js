import React, { useContext, useState } from "react"
import {UserContext} from "../context/context"
import {UserProvider} from '../context/context'
import axios from "axios"
import { useHistory } from "react-router-dom";
import usericon from '../icon/user.svg'

const Login = () =>{
  const [,setUser] = useContext(UserContext)
  const [input, setInput] = useState({email: "" , password: ""})
  const history = useHistory();

  const handleSubmit = (event) =>{
    event.preventDefault()
    axios.post("https://backendexample.sanbersy.com/api/user-login", {
      email: input.email, 
      password: input.password
    }).then(
      (res)=>{
        var user = res.data.user
        var token = res.data.token
        var currentUser = {name: user.name, email: user.email, token }
        setUser(currentUser)
        localStorage.setItem("user", JSON.stringify(currentUser))
        history.push("/")
      }
      
    ).catch((err)=>{
       alert(JSON.stringify(err.response.data))
      console.log(JSON.stringify(err))
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "email":{
        setInput({...input, email: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <>
      <div className="container-content">
          <div className="content">
              <div className="card-login">
                <div className="login-title">
                  <div className="logtit">
                    Login
                  </div>
                  <div className="icon-user">
                    <img className="" alt="user" src={usericon} />
                  </div>
                </div>
                <form className="form-input" onSubmit={handleSubmit}>
                      <div className="input login">
                        <label>Email: </label>
                        <input type="email" name="email" autoComplete="off" onChange={handleChange} value={input.email} placeholder="input your email here"/>
                      </div>
                      <div className="input login">
                        <label>Password: </label>
                        <input type="password" name="password" autoComplete="off" onChange={handleChange} value={input.password} placeholder="input your password here"/>
                      </div>
                      <div className="submit">
                        <button>Login</button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
    </>
  )
}

export default Login
