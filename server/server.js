const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();
const PORT = 9000;
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server has started on port " + PORT);
});

//add new note
app.post("/add-note", (req, res) => {
    let insertQuery = `insert into notes (note_id,text,date,user_id) values ('${req.body.note_id}','${req.body.text}',CURRENT_DATE,'${req.body.user_id}')`;
    pool.query(insertQuery, (err, result) => {
        if (!err) {
            res.send("inserted");
        } else {
            console.log(err.message);
        }
    });
});

app.get("/display-note", (req, res) => {
    let selectQuery = `select * from notes where user_id = '${req.body.user_id}'`;
    pool.query(selectQuery, (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err.message);
        }
    });
});

//add new note
app.delete("/delete-note", (req, res) => {
    let insertQuery = `delete from notes where note_id = '${req.body.note_id}'`;
    pool.query(insertQuery, (err, result) => {
        if (!err) {
            res.send("deleted");
        } else {
            console.log(err.message);
        }
    });
});