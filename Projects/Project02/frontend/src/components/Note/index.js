import React from "react";
import "./index.css";

export default function Note(props) {

  return (
    <div className="card">
        <h3 className="card-title">Dados do Covid no {props.Pais}:</h3>
        <div className="card-content">
            <ul className="card-list">
                <li>Quantidade de casos hoje: {props.NumNovosCasos}</li>
                <li>Total de casos: {props.NumCasos}</li>
                <li>Quantidade de óbitos por Covid hoje: {props.NumNovasMortes}</li>
                <li>Total de óbitos: {props.NumMortes}</li>
            </ul>
        </div>
    </div>
  );
}