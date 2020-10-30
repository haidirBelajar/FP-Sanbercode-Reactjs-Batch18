import React, { useContext, useState } from "react";
import { UserContext } from "../context/context";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ChangePassword = () => {
    const [user] = useContext(UserContext)
    const [input, setInput] = useState({
        current_password: "",
        new_password:"",
        new_confirm_password: ""
    })

    const history = useHistory()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios
          .post(
            "https://backendexample.sanbersy.com/api/change-password",
            {
              current_password: input.current_password,
              new_password: input.new_password,
              new_confirm_password: input.new_confirm_password,
            },
            {
              headers: { Authorization: `Bearer ${user.token}` },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              history.push("/login");
              alert("Ganti Password Sukses");
            }
          })
          .catch((err) => {
            alert(JSON.stringify(err.response.data));
          });
      };

      const handleChange = (event) =>{
        let typeOfInput = event.target.name
        console.log(typeOfInput, event.target.value)
        switch (typeOfInput){
          case "current_password":
          {
            setInput({...input, current_password: event.target.value});
            break
          }
          case "new_password":
          {
            setInput({...input, new_password: event.target.value});
            break
          }
          case "new_confirm_password":
          {
            setInput({...input, new_confirm_password: event.target.value});
              break
          }
          default:
            {break;}
          }
        }

    return (
        <div className="container-content">
          <div className="content">
        <h1>Change Password</h1>
        <form className="form-input" onSubmit={handleSubmit}>
            <div className="input">
                <label>Current Password</label>
                <input type="password" name="current_password" value={input.current_password} onChange={handleChange}/>    
            </div> 
            <div className="input">
                <label>New Password</label>
                <input type="password" name="new_password" value={input.new_password} onChange={handleChange}/>    
            </div>
            <div className="input">
                <label>Confirm New Password</label>
                <input type="password" name="new_confirm_password" value={input.new_confirm_password} onChange={handleChange}/>    
            </div>
            <div className="submit">
                <button>Submit</button>
            </div>
        </form>
        </div>
      </div>
    ) 
}

export default ChangePassword