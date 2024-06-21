import React from "react";
import "./index.css";

export default function NewsCard(props) {
    const title = props.title
    const url = props.url
    const source = props.source
  return (
          <div className="news-card" >
            <a className = "news-title a" href={url} target="_blank" rel="noreferrer noopener">{title}</a>
            <p className="news-source">Source: {source}</p>
          </div>
  );
}