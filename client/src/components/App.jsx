import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch('/api/notes').then(res => {
      if (res.ok) {
        return res.json()
      }
    }).then(jsonRes => setNotes(jsonRes))
  });


  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }


  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter(noteItem => {
        return noteItem._id !== id;
      });
    });
  }


  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote}/>
      {notes.map((note, index) => {
        return (
          <Note
            key={index}
            id={note._id}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;