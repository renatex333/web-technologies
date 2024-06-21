import React from "react";

import { slide as Menu } from 'react-burger-menu';

import "./index.css";

import { useState, useEffect } from "react";
// https://www.digitalocean.com/community/tutorials/react-react-burger-menu-sidebar
// https://github.com/negomi/react-burger-menu
// https://negomi.github.io/react-burger-menu/
// https://www.npmjs.com/package/react-burger-menu


function logout() {
  sessionStorage.clear();
}



export default function Sidebar(props) {

  const [name, setName]= useState("");

  function getName(){
    setName(sessionStorage.getItem('name'))
  }

  useEffect(() => {
    getName();
  },[]);

  return (
    <Menu right>
      {props.token &&
      <h2 className="menu-item">Welcome, {name}</h2>
      }
      <a className="menu-item" href="/">
        Home
      </a>
      {!props.token &&
      <a className="menu-item" href="/login">
        Login
      </a>
      }
      <a className="menu-item" href="/credits">
        Credits
      </a>
      {props.token &&
        <form onSubmit={logout}>
          <button className="logout">logout</button>
        </form>
      }
    </Menu>
  );
}