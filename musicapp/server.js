/*
const express = require("express");
const { spawn } = require("child_process");
const bodyParser = require("body-parser");
const cors = require("cors");
var mysql = require("mysql");

const app = express();

app.use(cors());
// parse application/json
app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Cheese1601",
  database: "support",
});

//connect to database
con.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected...");
});



app.listen(3001, () => {
  console.log("Server running successfully on 3001");
});

*/


const express = require('express'); //Line 1
const cors = require('cors')
const app = express(); //Line 2

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5001; //Line 3
var mysql = require("mysql");

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ilovedatabases",
    database: "music",
});

//connect to database
con.connect((err) => {
    if (err) throw err;
    console.log("Mysql Connected...");
});

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

// get data
app.post("/check-data", (req, res) => {
  const givenTitle = req.body?.songTitle
  con.query(
    `SELECT * FROM Song WHERE title='${givenTitle}'`,
    // `SELECT * FROM SAMPLE WHERE SAMPLE.songName='${givenTitle}';`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

//verify username and password
app.post("/check-login", (req, res) => {
  const givenUsername = req.body?.username
  const givenPassword = req.body?.password
  // INSERT INTO User VALUES ("user1", "password1");
  con.query(
    `SELECT * FROM User WHERE username='${givenUsername}' AND password='${givenPassword}'`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

//verify username and password
app.post("/make-new-user", (req, res) => {
  const givenUsername = req.body?.username
  const givenPassword = req.body?.password
  const givenFName = req.body?.firstName
  const givenLName = req.body?.lastName

  // INSERT INTO User VALUES ("user1", "password1");
  con.query(
    `INSERT INTO User VALUES ('${givenUsername}', '${givenPassword}')`,
    function (err, result, fields) {
      if (err) res.send("ERROR");
      else res.send("SUCCESS")
    }
  );
});

// TODO: add 
// Playlists
app.get("/playlist-query", (req, res) => {
  "test"
});
