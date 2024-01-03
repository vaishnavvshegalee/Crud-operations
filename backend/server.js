const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(express.json());
// connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud",
  // connectionLimit: 10,
});

// api endpoints
app.get("/", (req, res) => {
  const sql = "Select * from students";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql = "Insert into students(`Name`,`Email`) values(?)";
  const values = [req.body.name, req.body.email];
  db.query(sql, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.put("/update/:id", (req, res) => {
  const sql = "Update students set Name = ? ,Email= ? where ID = ?";
  const values = [req.body.name, req.body.email];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.delete("/student/:id", (req, res) => {
  const sql = "delete from students where ID = ?";
  const id = req.params.id;
  db.query(sql, id, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.listen(8080, () => {
  console.log("listening");
});
