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

//add new password
app.post("/add-password", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into passwords (id,websitename,websiteurl,passkey,username,created_at,updated_at,userid) values ('${user.id}','${user.websitename}','${user.websiteurl}','${user.passkey}','${user.username}',CURRENT_DATE,CURRENT_DATE,'${user.userid}')`;
  pool.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("inserted");
    } else {
      console.log(err.message);
    }
  });
});

//delete note
app.post("/delete-password", (req, res) => {
  let deleteQuery = `delete from passwords where id = '${req.body.id}'`;
  pool.query(deleteQuery, (err, result) => {
    if (!err) {
      res.send("deleted");
    } else {
      console.log(err.message);
    }
  });
});

//update password
app.put("/update-password", (req, res) => {
    const user = req.body.updatedPassword;
    let deleteQuery = `update passwords set websitename ='${user.websitename}', websiteurl ='${user.websiteurl}', passkey ='${user.passkey}', username ='${user.username}',updated_at=current_date where id = '${req.body.id}'`;
    pool.query(deleteQuery, (err, result) => {
        if (!err) {
            res.send("updated");
        } else {
            console.log("Updated Password");
            console.log(err.message);
        }
    });
});

//display all passwords
app.post("/display-password", (req, res) => {
    let insertQuery = `select * from passwords where userid = '${req.body.userid}'`;
    pool.query(insertQuery, (err, result) => {
        if (!err) {
            res.send(result.rows);
        } else {
            console.log(err.message);
        }
    });
});

//add new note
app.post("/add-note", (req, res) => {
  let insertQuery = `insert into notes (id,text,time,color,user_id) values ('${req.body.note_id}','${req.body.text}',current_date,'${req.body.color}','${req.body.user_id}')`;
  pool.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("inserted");
    } else {
      console.log(err.message);
    }
  });
});

//display notes
app.post("/display-note", (req, res) => {
  let selectQuery = `select * from notes where user_id = '${req.body.user_id}'`;
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      res.send(result.rows);
    } else {
      console.log(err.message);
    }
  });
});

//delete note
app.post("/delete-note", (req, res) => {
  let deleteQuery = `delete from notes where id = '${req.body.note_id}'`;
  pool.query(deleteQuery, (err, result) => {
    if (!err) {
      res.send("deleted");
    } else {
      console.log(err.message);
    }
  });
});

//update note
app.put("/update-note", (req, res) => {
  let deleteQuery = `update notes set text ='${req.body.text}' where id = '${req.body.note_id}'`;
  pool.query(deleteQuery, (err, result) => {
    if (!err) {
      res.send("deleted");
    } else {
      console.log(err.message);
    }
  });
});

// new user signup
app.post("/signup", (req, res) => {
  const user = req.body;
  console.log("api called");
  let selectQuery = `select count(email) from users where email='${user.email}'`;
  pool.query(selectQuery, (err, result) => {
    if (!err) {
      console.log("inside if");
      if (result.rows[0].count == 0) {
        let insertQuery = `insert into users(name, email, password, role)
                            values('${user.name}', '${user.email}', '${user.password}', 'user') `;
        pool.query(insertQuery, (err, result1) => {
          if (!err) {
            res.send({ exists: "False", insert: "Insertion was successful" });
          } else {
            console.log(err.message);
          }
        });
      } else {
        console.log("inside else");
        res.send({
          exists: "True",
        });
      }
    } else {
    }
  });
  pool.end;
});

//signin verification
app.post("/signin", (req, res) => {
  const user = req.body;
  const email = user.email;
  const password = user.password;
  let passQuery = `Select password,role from users where email = '${email}'`;
  pool.query(passQuery, (err, result) => {
    console.log(result1.rows);
    if (result.rows != 0) {
      if (result.rows[0].password == password) {
        console.log(result.rows);
        res.send({
          success: "True",
        });
      } else {
        res.send({
          sucess: "False",
        });
      }
    } else {
      res.send({
        sucess: "False",
      });
    }
  });
});
