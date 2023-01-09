import React, {useState} from "react";
import Note from "./Note";
import AddNote from "./AddNote";
import "../../Styles/NotesMain.css";
import axios from "axios";

const NotesList = ({ notes, handleAddNote, handleDeleteNote }) => {

  const [data, setData] = useState([]);

  const url2 = "http://localhost:9000/display-note";
  axios
    .get(url2, {
      user_id: 123,
    })
    .then((res) => {
      setData(res.data);
      console.log(res.data);
      console.log("Displayed Notes !!!");
      setData(data);
    });

  return (
    <div className="notes-list">
      <AddNote handleAddNote={handleAddNote} />
      <div>
        {data.map((note) => (
          <Note
            id={note.note_id}
            text={note.text}
            date={note.date}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
      </div>
      {/* {notes.map((note) => (
        <Note
          id={note.note_id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
        />
      ))} */}
    </div>
  );
};

export default NotesList;
