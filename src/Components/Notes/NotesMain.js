import React, { useState } from "react";
// import { nanoid } from "nanoid";
import { v4 as uuid } from "uuid";
import NotesList from "./NotesList";
import SearchNotes from "./SearchNotes";
import Header from "./Header";
import "../../Styles/NotesMain.css";
import axios from "axios";

export const NotesMain = () => {
  const [notes, setNotes] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  // useEffect(() => {
  //   const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
  //   if (savedNotes) {
  //     setNotes(savedNotes);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  // }, [notes]);

  const addNote = (text) => {
    const date = new Date();

    const newNote = {
      id: uuid(),
      // id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };

    const url = "http://localhost:9000/add-note";
    axios
      .post(url, {
        note_id: newNote.id,
        text: text,
        user_id: 123,
      })
      .then((res) => {
        console.log(res);
        console.log("Notes !!!");
      });

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <SearchNotes handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  );
};
