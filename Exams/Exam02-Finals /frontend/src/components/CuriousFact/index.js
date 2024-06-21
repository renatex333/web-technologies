import React, { useState } from "react";
import "./index.css";
import axios from "axios";

export default function CuriousFact(props) {

  const [number, setNumber] = useState("");
  const [cf, setCF] = useState("");

  const modifiedNumber = (event) => {
    setNumber(event.target.value);
  }

  const getCuriousFact = (event) => {
    event.preventDefault();
    let message = {"number": number}
    axios
      .post("http://localhost:8000/api/cf", message)
      .then((res)=>{
        setCF(res.data.message);
        setNumber("");
      })
    }

  return (
    <div className="cf-container">
      <h1 className="title">Escolha um número para receber um fato curioso sobre esse número!</h1>
      <form className="form-cf" onSubmit={getCuriousFact}>
        <label>
          <input
            className="number-input"
            name="number" 
            type="text" 
            placeholder="Número"
            onChange={modifiedNumber}
            value={number}
          />
        </label>
        <button className="btn-cf" type="submit" disabled={number === ""}>Enviar</button>
      </form>

      {
        cf === "" ? (
          <h3 className="text-cf"></h3>
        ) : (
          <h3 className="text-cf">{cf}</h3>
        )
      }

    </div>
  );
}