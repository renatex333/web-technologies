import React from "react";
import FriendsList from "../FriendsList";
import News from "../News";
import "./index.css";
import {useState, useEffect} from "react";
import axios from "axios";


const SERVER_URL = 'https://peaceful-brook-18641.herokuapp.com'

export default function Homepage(props) {
  
  const [news, setNews] = useState([]);

  const loadNews = (event) => {
    axios
    .get(
        SERVER_URL + "/api/news",

        axios.defaults.xsrfCookieName = 'csrftoken',
        axios.defaults.xsrfHeaderName = 'X-CSRFToken',
        )
    .then((res)=>{ 
      setNews(res.data)
    }
  )}

  useEffect(() => {
    loadNews();
  },[]);

  return (
    <div className="homepage">
      <News key={0} dados={news}></News>
      <FriendsList token={props.token}></FriendsList>      
    </div>
  );
}