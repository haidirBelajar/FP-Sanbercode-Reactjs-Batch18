import React, { useContext, useState } from "react"
import {UserContext} from "../context/user-context"
import {UserProvider} from '../context/user-context'
import axios from "axios"
import { useHistory } from "react-router-dom";

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
        history.push("/home")
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
      <div style={{margin: "0 auto", width: "25%", padding: "50px"}}>
        <form onSubmit={handleSubmit}>
          <label>Email: </label>
          <input type="email" name="email" onChange={handleChange} value={input.email}/>
          <br/>
          <label>Password: </label>
          <input type="password" name="password" onChange={handleChange} value={input.password}/>
          <br/>
          <button>Login</button>
        </form>
      </div>
    </>
  )
}

export default Login
