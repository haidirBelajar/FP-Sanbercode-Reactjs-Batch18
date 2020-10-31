import React, { useContext, useState } from "react";
import { UserContext } from "../context/context";
import axios from "axios";
import usericon from '../icon/user.svg'
 
const RegisterForm = () => {
  const [, setUser] = useContext(UserContext);
  const [input, setInput] = useState({ name: "", email: "", password: "" });
 
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://backendexample.sanbersy.com/api/register", {
        name: input.name,
        email: input.email,
        password: input.password,
      })
      .then((res) => {
        var user = res.data.user;
        var token = res.data.token;
        var currentUser = { name: user.name, email: user.email, token };
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
 
  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    switch (name) {
      case "name": {
        setInput({ ...input, name: value });
        break;
      }
      case "email": {
        setInput({ ...input, email: value });
        break;
      }
      case "password": {
        setInput({ ...input, password: value });
        break;
      }
      default: {
        break;
      }
    }
  };
 
  return (
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
                    <label>name: </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="input your full name"
                      autoComplete="off"
                      onChange={handleChange}
                      value={input.name}
                    />
                  </div>
                  <div className="input login">
                    <label>email: </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="input your email"
                      autoComplete="off"
                      onChange={handleChange}
                      value={input.email}
                    />
                  </div>
                  <div className="input login">
                    <label>Password: </label>
                    <input
                      type="password"
                      name="password"
                      placeholder="input your password"
                      autoComplete="off"
                      onChange={handleChange}
                      value={input.password}
                    />
                  </div>
                  <div className="submit">
                     <button>Register</button>
                  </div>
                </form>
            </div>
          </div>
        </div>
    </>
  );
};
 
export default RegisterForm;