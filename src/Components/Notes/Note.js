import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import "../../Styles/NotesMain.css";

const Note = ({ id, text, date, handleDeleteNote }) => {
  return (
    <div className="note">
      <span>{text}</span>
      <div className="note-footer">
        <small>{date}</small>
        <MdEditNote className="edit-icon" size="2em" />
        <MdDeleteForever
          onClick={() => handleDeleteNote(id)}
          className="delete-icon"
          size="1.3em"
        />
      </div>
    </div>
  );
};

export default Note;
