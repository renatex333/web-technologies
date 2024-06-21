import React, {useState} from "react";
import PropTypes from 'prop-types';
import "./index.css";
import {useNavigate} from 'react-router-dom';


const SERVER_URL = 'https://peaceful-brook-18641.herokuapp.com'

async function loginUser(credentials) {
  return fetch(SERVER_URL+'/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 } 

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const nav = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    props.setToken(token);
    sessionStorage.setItem('name', username);
    setUserName("");
    setPassword("");
    nav("/");
    window.location.reload(false)
  }

  return (
    <main className="page">
      <div className="login-block">
        <h1 className="login-text">Switch Account</h1>
        <form className="form-block" onSubmit={handleSubmit}>
          <label>
            <input type="text" placeholder="Username" onChange={e => setUserName(e.target.value)}/>
          </label>
          <label>
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </label>
          <button className="btn" type="submit">Login</button>
          <h5 className="login-message">Don't have an account yet? <a className="create-account-href" href="/createaccount">Create an account now for free!</a></h5>
        </form>
      </div>
    </main>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};