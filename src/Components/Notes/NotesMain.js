import React, { useEffect, useState } from "react";
import NoteContainer from "./NoteContainer";
import SideBar from "./SideBar";
import axios from "axios";
import "../../Styles/NotesMain.css";

export const NotesMain = () => {
  const [notes, setNotes] = useState([]);

  const [userId, setuserId] = useState();

  function getUserId() {
    var x = localStorage.getItem("email");
    const url2 = "http://localhost:9000/user-id";
    axios
      .post(url2, {
        email: x,
      })
      .then((res) => {
        setuserId(res.data.sucess);
      });
    console.log("userId " + userId);
  }

  useEffect(() => {
    getUserId();
  }, []);

  // allNotes();

  const allNotes = () => {
    const url = "http://localhost:9000/display-note";
    axios
      .post(url, {
        user_id: userId,
      })
      .then((res) => {
        setNotes(res.data);
      });
  };

  const addNote = (color) => {
    const tempNotes = [...notes];

    const url = "http://localhost:9000/add-note";
    const id = Date.now() + "" + Math.floor(Math.random() * 78);
    axios
      .post(url, {
        note_id: id,
        text: "",
        time: Date.now(),
        user_id: userId,
        color: color,
      })
      .then((res) => {
        console.log(res);
        console.log("Notes !!!");
      });

    tempNotes.push({
      id: id,
      text: "",
      time: Date.now(),
      color,
    });

    allNotes();
    // setNotes(tempNotes);
  };

  const deleteNote = (id) => {
    const tempNotes = [...notes];

    const url = "http://localhost:9000/delete-note";
    axios
      .post(url, {
        note_id: id,
      })
      .then((res) => {
        console.log(res);
        console.log("Notes !!!");
      });

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes.splice(index, 1);
    allNotes();
    // setNotes(tempNotes);
  };

  const updateText = (text, id) => {
    const tempNotes = [...notes];

    const url = "http://localhost:9000/update-note";

    axios
      .put(url, {
        note_id: id,
        text: text,
      })
      .then((res) => {
        console.log(res);
        console.log("Notes !!!");
      });

    const index = tempNotes.findIndex((item) => item.id === id);
    if (index < 0) return;

    tempNotes[index].text = text;
    allNotes();
    // setNotes(tempNotes);
  };

  useEffect(() => {
    allNotes();
  }, [notes]);

  return (
    <div className="App">
      <SideBar addNote={addNote} />
      <NoteContainer
        notes={notes}
        deleteNote={deleteNote}
        updateText={updateText}
      />
    </div>
  );
};
