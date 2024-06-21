import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Credits from "./components/Credits";
import Sidebar from './components/Sidebar';
import CreateAccount from './components/CreateAccount';
import './App.css';
// import React, {useState} from 'react';


// Inicialmente, usando a seguinte color palette:
// https://colorhunt.co/palette/3db2ffffeddaffb830ff2442
// Outras opções:
// https://colorhunt.co/palette/ff5c58fe8f8ffcd2d1ffedd3


function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const token = getToken();


  return (
    <div className="App">
      <header className="App-header" id="outer-container">
        <img className="switch-logo" src="/switch-logo.png" alt="Switch Logo" />
      </header>
      {/* Exemplo de uso das Routes https://www.geeksforgeeks.org/reactjs-router/#:~:text=React%20Router%20is%20a%20standard,how%20the%20React%20Router%20works. */}
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} token={token}/>
      <div className="main" id="page-wrap">
        <Router>
          <Routes>
            <Route exact path='/' element={<Homepage token={token}></Homepage>}></Route>
            {!token &&
            <Route exact path='/login' element={<Login setToken={setToken} token={token}/>}></Route>
            }
            {token &&
            <Route exact path='/login' element={<Homepage token={token}></Homepage>}></Route>
            }
            <Route exact path='/credits' element={<Credits/>}></Route>
            <Route exact path='/createaccount' element={<CreateAccount/>}></Route>
          </Routes>
        </Router>
      </div>
      
    </div>
  );
}

export default App;
