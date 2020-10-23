import React, { useContext, useState } from "react";
import { UserContext } from "../context/user-context";
import axios from "axios";
 
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
      <div style={{ margin: "0 auto", width: "25%", padding: "50px" }}>
        <form onSubmit={handleSubmit}>
          <label>name: </label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={input.name}
          />
          <br />
          <label>email: </label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={input.email}
          />
          <br />
          <label>Password: </label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={input.password}
          />
          <br />
          <button>Register</button>
        </form>
      </div>
    </>
  );
};
 
export default RegisterForm;