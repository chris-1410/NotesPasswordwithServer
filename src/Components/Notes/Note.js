import React from "react";
// , {useState} 
import { MdDeleteForever } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import "../../Styles/NotesMain.css";
// import axios from "axios";

const Note = ({ id, text, date, handleDeleteNote }) => {

  // const [data, setData] = useState([]);

  // const url2 = "http://localhost:9000/display-note";
  // axios
  //   .get(url2, {
  //     user_id: 123,
  //   })
  //   .then((res) => {
  //     setData(res.data);
  //     console.log(res.data);
  //     console.log("Displayed Notes !!!");
  //     setData(data);
  //   });

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
