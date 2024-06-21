import { useState } from "react";
import axios from "axios";
import "./index.css";


export default function Formulario(props) {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");

  const tituloModificado = (event) => {
      setTitulo(event.target.value);
  }

  const conteudoModificado = (event) => {
    setConteudo(event.target.value);
  }

  const criaNota = (event) => {
    event.preventDefault()
    axios
      .post("http://localhost:8000/api/notes/", { "title": titulo, "content": conteudo})
      .then((res)=>{
        setTitulo("");
        setConteudo("");
        props.carregaNotas();
      })
  }

  return (
    <form className="form-card" onSubmit={criaNota}>
        <input
          className="form-card-title"
          type="text"
          name="titulo"
          placeholder="Título"
          onChange={tituloModificado}
          value={titulo}
        />
        <textarea
          className="autoresize"
          name="detalhes"
          placeholder="Digite o conteúdo..."
          onChange={conteudoModificado}
          value={conteudo}
        ></textarea>
        <button className="btn" type="submit">Criar</button>
      </form>
  );
}