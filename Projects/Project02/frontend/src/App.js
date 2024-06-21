import { useEffect, useState } from "react";
import axios from "axios";
import Note from "./components/Note";
import Compare from "./components/Compare";
import './App.css';

function App() {

  const [estado, setEstado] = useState("brasil");

  function changeState(new_state) {
    setEstado(new_state);
  }

  const [note, setNote] = useState([]);
  const [country, setCountry] = useState("");
  const [otherNote, setOther] = useState([]);


  useEffect(() => {
    axios
    .get("https://enigmatic-hamlet-10547.herokuapp.com")
    .then((res) => {
      let message = {'data': 'Brasil'};
      axios
      .post("https://enigmatic-hamlet-10547.herokuapp.com/api/save", message)
      .then((res) => {
        axios
        .post("https://enigmatic-hamlet-10547.herokuapp.com/api/get", message)
        .then((res) => {
          setNote(res.data);
        })
      });
    })
  }, []);

  const changeCountry = (event) => {
    setCountry(event.target.value);
  }

  function getCountryData(event) {
    event.preventDefault()
    let message = {'data':country};
    axios
      .post("https://enigmatic-hamlet-10547.herokuapp.com/api/save", message)
      .then((res)=> {
        axios
        .post("https://enigmatic-hamlet-10547.herokuapp.com/api/get", message)
        .then((res) => {
          setOther(res.data);
        })
      });
  }

  return (
    <div className="App">
        <button className="btn" type="submit" onClick={() => changeState("brasil")}>Quero informações do Brasil!</button>
        <form className="form-pais" onSubmit={getCountryData}>
          <select 
            className="form-name"
            type="text"
            onChange={changeCountry}
          >
            <option value={"Argentina"}>Argentina</option>
            <option value={"Bolívia"}>Bolívia</option>
            <option value={"Chile"}>Chile</option>
            <option value={"Colômbia"}>Colômbia</option>
            <option value={"Equador"}>Equador</option>
            <option value={"Guiana"}>Guiana</option>
            <option value={"Paraguai"}>Paraguai</option>
            <option value={"Peru"}>Peru</option>
            <option value={"Suriname"}>Suriname</option>
            <option value={"Uruguai"}>Uruguai</option>
            <option value={"Venezuela"}>Venezuela</option>
            
          </select>
          <button className="btn" type="submit" onClick={() => changeState("compara")}>Quero um comparativo com o Brasil!</button>
        </form>
        <div className="info-box">
          <img className="covid-logo" src="/covid-logo.png" alt="" />
          {estado === "brasil"
            ? <Note Pais={note.Pais} NumNovosCasos={note.NumNovosCasos} NumCasos={note.NumCasos} NumNovasMortes={note.NumNovasMortes} NumMortes={note.NumMortes}></Note>
            : <Compare NomePais1={note.Pais} NumNovosCasos1={note.NumNovosCasos} NumCasos1={note.NumCasos} NumNovasMortes1={note.NumNovasMortes} NumMortes1={note.NumMortes} NomePais2={otherNote.Pais} NumNovosCasos2={otherNote.NumNovosCasos} NumCasos2={otherNote.NumCasos} NumNovasMortes2={otherNote.NumNovasMortes} NumMortes2={otherNote.NumMortes}></Compare>
          }
          <img className="covid-mask" src="/covid-mask.png" alt="" />
        </div>

    </div>
  );
}

export default App;
