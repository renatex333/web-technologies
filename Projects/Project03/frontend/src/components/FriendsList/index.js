import React from "react";
import { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";


const SERVER_URL = 'https://peaceful-brook-18641.herokuapp.com'

export default function FriendsList(props) {
  const [friendName, setFriendName] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [frMessage, setFRMessage] = useState("");
  const token = props.token;

  const loadFriendsList = (event) => {
    let friendsLink = SERVER_URL + "/api/user";
    let authorization = {headers:{"Authorization": `Token ${token}`}};
    axios
    .get(friendsLink, authorization)
    .then((res)=>{ 
      setFriendsList(res.data.friends);
      setFriendRequests(res.data.friend_requests);
    }
  )};


  function acceptFriendRequest(requestId) {
    let acceptLink = SERVER_URL + "/accept_friend_request/" + requestId;
    let authorization = {headers:{"Authorization": `Token ${token}`}};
    axios
    .get(acceptLink, authorization)
    .then((res)=>{
      loadFriendsList();
    })
  }

  function denyFriendRequest(requestId) {
    let denyLink = SERVER_URL + "/deny_friend_request/" + requestId;
    let authorization = {headers:{"Authorization": `Token ${token}`}};
    axios
    .get(denyLink, authorization)
    .then((res)=>{
      loadFriendsList();
    })
  }

  const modifiedName = (event) => {
    setFriendName(event.target.value);
  }

  function addFriend(event) {
    event.preventDefault();
    let message = {"friendName": friendName};
    let sendFRLink = SERVER_URL + "/send_friend_request";
    let authorization = {headers:{"Authorization": `Token ${token}`}};
    // Aqui faz request no servidor para adicionar amigo pelo nome
    axios
    .post(sendFRLink, message, authorization)
    .then((res)=>{
      setFRMessage(res.data.response);
    });
    // Depois de tudo (mas dentro do "then" da request) faz esse comando abaixo para limpar o formulário (Exemplo em Heoku-React-TW/components/Formulario/index.js)
    setFriendName("");
  }

  useEffect(() => {
    loadFriendsList();
  });


  return (
    <div className="friends">
        <div className="friend-list-header">
          <h1 className="list-title">Friends List</h1>
          <form className="friend-list-form" onSubmit={addFriend}>
            <input 
              className="friend-name-input" 
              type={"text"} 
              name="name-input" 
              placeholder="Add Friend by Username" 
              onChange={modifiedName} 
              value={friendName}
            />
            <button className="add-friend-btn" type="submit">
              <img className="generic-icon" src="/plus-solid.png" alt="Plus Icon" />
            </button>
          </form>
          {
            frMessage === "" ? (
              console.log()
            ) : (
              <h5 className="system-message">{frMessage}</h5>
            )
          }
        </div>
        <h3>Friend Requests</h3>
        <ul className="list-content">
        {friendRequests.map((data) => (
          <li key={data.friend_request_user} className="friend-request-li">
            {data.friend_request_user}
            <button className="answer-request-btn" onClick={() => acceptFriendRequest(data.friend_request_id)}>
              <img className="generic-icon" src="/accept.png" alt="Accept Icon" />
            </button>
            <button className="answer-request-btn" onClick={() => denyFriendRequest(data.friend_request_id)}>
              <img className="generic-icon" src="/deny.png" alt="Deny Icon" />
            </button>
          </li>
        ))}
        </ul>
        <h3>Your Friends</h3>
        <div className="list-content">
        {friendsList.map((s) => (
          <div key={s} className="friend-li">{s}</div>
        ))}
        </div>
    </div>
  );
}