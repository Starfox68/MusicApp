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
const bcrypt = require('bcrypt');

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 5001; //Line 3
var mysql = require("mysql");

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

var con = mysql.createConnection({
    host: "localhost",
    user: "musicUser",
    password: "Ilovedatabases",
    database: "music",
});

//connect to database
con.connect((err) => {
    if (err) throw err;
    console.log("Mysql Connected...");
});

//for encryption
const saltRounds = 10;

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //Line 11

// Search for a song title
app.post("/search-song-title", (req, res) => {
  const songTitle = req.body?.songTitle
  const username = req.body?.username

  const query = (songTitle) ? 
  `SELECT Song.songID as songID, title, releaseDate, totalLikes, userLikes
  FROM Song LEFT OUTER JOIN (
      SELECT songID, count(songID) as totalLikes, SUM(CASE WHEN SongLike.username='${username}' THEN 1 ELSE 0 END) as userLikes
      FROM SongLike
      GROUP BY songID
  ) AS SongLikeTotals ON Song.songID = SongLikeTotals.songID
  WHERE title='${songTitle}';` : 
  `SELECT Song.songID as songID, title, releaseDate, totalLikes, userLikes
  FROM Song LEFT OUTER JOIN (
      SELECT songID, count(songID) as totalLikes, SUM(CASE WHEN SongLike.username='${username}' THEN 1 ELSE 0 END) as userLikes
      FROM SongLike
      GROUP BY songID
  ) AS SongLikeTotals ON Song.songID = SongLikeTotals.songID
  LIMIT 100`;  
  con.query(
    query,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

// Like/unlike a song
app.post("/like-song", (req, res) => {
  const songID = req.body?.songID
  const username = req.body?.username
  const liked = req.body?.selected

  const query = (liked) ?
  `INSERT INTO SongLike VALUES(${songID}, '${username}')` :
  `DELETE FROM SongLike WHERE SongLike.songID = ${songID} AND SongLike.username = '${username}'`;

  con.query(query);
});

// Verify username and password
app.post("/check-login", (req, res) => {
  const givenUsername = req.body?.username
  const givenPassword = req.body?.password

  // User VALUES ("user1", "password1");
  con.query(
    `SELECT * FROM User WHERE username='${givenUsername}'`,
    function (err, result, fields) {
      if (err) throw err;

    bcrypt.compare(givenPassword, result[0].password, function(err, answer){
      if (answer){
        res.send({ result })
      }else{
        res.send({result: []})
      }
    })
    }
  );
});

//Create new username and password
app.post("/make-new-user", (req, res) => {
  const givenUsername = req.body?.username
  const givenPassword = req.body?.password
  // const givenFName = req.body?.firstName
  // const givenLName = req.body?.lastName


  var hashedPassword = givenPassword;
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(givenPassword, salt, function(err, hash){
      hashedPassword = hash  

      // INSERT INTO User VALUES ("user1", "password1");
      con.query(
        `INSERT INTO User VALUES ('${givenUsername}', '${hashedPassword}')`,
        function (err, result, fields) {
          if (err) res.send("ERROR");
          else res.send("SUCCESS")
        }
      );
    })
  })
});

// TODO: add 
// Playlists
app.get("/playlist-query", (req, res) => {
  "test"
});
