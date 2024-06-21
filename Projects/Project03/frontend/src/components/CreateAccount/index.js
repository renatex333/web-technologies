import React from "react";
import { useState } from "react";
import "./index.css";
import axios from "axios";
// import PropTypes from 'prop-types';

const SERVER_URL = 'https://peaceful-brook-18641.herokuapp.com'

export default function CreateAccount(props) {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createdAccMessage, setCreatedAccMessage] = useState("");

  const modifiedPassword = (event) => {
    setPassword(event.target.value);
  }

  const modifiedConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  const accountCreate = (event) => {
    event.preventDefault()
    axios
      .post(
          SERVER_URL + "/api/signup",{"username":username, "password":password}
          )
      .then((res)=>{ 
        setCreatedAccMessage(res.data.response);
        setUserName("");
        setPassword("");
        setConfirmPassword("");
      }
      )
    }


  return (
    <main className="page">
      <div className="create-acc-block">
      <h1 className="create-acc-text">Create a brand new account</h1>
      <form className="form-block" onSubmit={accountCreate}>
        <label>
          <input type="text" placeholder="Username" onChange={e => setUserName(e.target.value)} value={username}/>
        </label>
        <label>
          <input 
            name="password" 
            type="password" 
            placeholder="Password"
            onChange={modifiedPassword}
            value={password}
          />
        </label>
        <label>
          <input 
            name="confirm-password" 
            type="password" 
            placeholder="Confirm Password"
            onChange={modifiedConfirmPassword}
            value={confirmPassword}  
          />
        </label>
        {
          password === "" ? (
            console.log()
          ) : (
            password !== confirmPassword ? (
            <h5 className="system-message">Passwords don't match!</h5>
            ) : (
            <h5 className="system-message">Passwords match!</h5>
            )
          )
        }
        {
          createdAccMessage === "" ? (
            console.log()
          ) : (
            <h5 className="system-message">{createdAccMessage}</h5>
          )
        }
        <button className="btn" type="submit" disabled={password !== confirmPassword}>Create Account</button>

      </form>
      </div>
    </main>
  )
}