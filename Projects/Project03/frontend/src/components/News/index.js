import React from "react";
import "./index.css";
import NewsCard from "../NewsCard";

export default function News(props) {
  const dados = props.dados
  return (
    <div className="news-block">
      <h1 className="news">News</h1>
      <div>
        {dados.map((dado) => (
          <NewsCard key={dados.indexOf(dado)} url={dado.url} source={dado.source} title={dado.title}></NewsCard>
          ))}
      </div>
    </div>
  );
}