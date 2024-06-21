import axios from "axios";
import { useEffect, useState } from "react";
import Note from "./components/Note";
import Appbar from "./components/Appbar";
import Formulario from "./components/Formulario";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]); // Remova o array de notes que existia na versão anterior

  const loadNotes = () => {
    axios
      .get("http://localhost:8000/api/notes/")
      .then((res) => setNotes(res.data));
  }

  useEffect(() => {
    loadNotes();
  }, []);

  console.log(notes);
  return (
    <div className="App">
      <Appbar />
      <main className="container">
        <Formulario carregaNotas={loadNotes}></Formulario>
        {notes.map((note) => (
          <Note key={`note__${note.id}`} title={note.title}>{note.content}</Note>
        ))}
      </main>
    </div>
  );
}

export default App;