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


function makeSongQuery(songTitle, username) {
  if (songTitle) {
    const query = `SELECT Song.songID as songID, title, releaseDate, totalLikes, userLikes
    FROM Song LEFT OUTER JOIN (
        SELECT songID, count(songID) as totalLikes, SUM(CASE WHEN SongLike.username=? THEN 1 ELSE 0 END) as userLikes
        FROM SongLike
        GROUP BY songID
    ) AS SongLikeTotals ON Song.songID = SongLikeTotals.songID
    WHERE MATCH (title) AGAINST(CONCAT(?, '*') IN BOOLEAN MODE);`
    var val= [username, songTitle];
    var sql = mysql.format(query, val);
    return sql;
  } else {
    const query = `SELECT Song.songID as songID, title, releaseDate, totalLikes, userLikes
    FROM Song LEFT OUTER JOIN (
        SELECT songID, count(songID) as totalLikes, SUM(CASE WHEN SongLike.username='${username}' THEN 1 ELSE 0 END) as userLikes
        FROM SongLike
        GROUP BY songID
    ) AS SongLikeTotals ON Song.songID = SongLikeTotals.songID
    LIMIT 30;`
    var val= [username];
    var sql = mysql.format(query, val);
    return sql;
  }
}

//TODO: prepare this statement
// Search for a song title
app.post("/search-song-title", (req, res) => {
  const songTitle = req.body?.songTitle
  const username = req.body?.username

  const sql = makeSongQuery(songTitle, username)
  
  con.query(
    sql,
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

  con.query(
    query,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

app.post("/get-song-likes", (req, res) => {
  const songID = req.body?.songID

  con.query(
    `SELECT COUNT(*) AS totalLikes FROM SongLike WHERE songID='${songID}'`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  )
})

//prepared statement
// Verify username and password
app.post("/check-login", (req, res) => {
  const givenUsername = req.body?.username
  const givenPassword = req.body?.password

  var query = "SELECT * FROM User WHERE username = ?";
  var val= [givenUsername];
  var sql = mysql.format(query, val);

  // User VALUES ("user1", "password1");
  con.query(sql, function (err, result, fields) {
      if (err) throw err;

      if (result.length == 0){
        res.send({result: []})
      }else{
        bcrypt.compare(givenPassword, result[0].password, function(err, answer){
          if (answer){
            res.send({ result })
          }else{
            res.send({result: []})
          }
        })
      }
    }
  );
});

//prepared statement
//Create new username and password
app.post("/make-new-user", (req, res) => {
  const givenUsername = req.body?.username
  const givenPassword = req.body?.password


  var hashedPassword = givenPassword;
  bcrypt.genSalt(saltRounds, function(err, salt){
    bcrypt.hash(givenPassword, salt, function(err, hash){
      hashedPassword = hash  

      var query = "INSERT INTO User VALUES (?, ?)";
      var val= [givenUsername, hashedPassword];
      var sql = mysql.format(query, val);

      // INSERT INTO User VALUES ("user1", "password1");
      con.query(sql,
        function (err, result, fields) {
          if (err) res.send("ERROR");
          else res.send("SUCCESS")
        }
      );
    })
  })
});

// Playlists
app.post("/playlist-get", (req, res) => {
  const username = req.body?.username

  con.query(
    `SELECT playlistID, name, DATE_FORMAT(dateCreated, '%M %d %Y') AS dateCreated 
    FROM Playlist WHERE username='${username}';`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});


app.post("/playlist-get-songs", (req, res) => {
  const username = req.body?.username
  const playlistID = req.body?.playlistID

  con.query(
    `SELECT Song.songID as songID, title, releaseDate, totalLikes, userLikes
      FROM Song LEFT OUTER JOIN (
        SELECT songID, count(songID) as totalLikes, SUM(CASE WHEN SongLike.username='${username}' THEN 1 ELSE 0 END) as userLikes
        FROM SongLike
        GROUP BY songID
      ) AS SongLikeTotals ON Song.songID = SongLikeTotals.songID
      WHERE Song.songID IN (
        SELECT songID AS playlistSongID FROM PlaylistSong WHERE playlistID='${playlistID}' AND username='${username}'
      )`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
})

app.post("/playlist-get-not-containing", (req, res) => {
  const username = req.body?.username
  const songID = req.body?.songID

  con.query(
    `SELECT DISTINCT playlistID, name FROM Playlist WHERE username = '${username}' AND playlistID NOT IN (
      SELECT playlistID FROM PlaylistSong WHERE songID = '${songID}')`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
})

//prepared query
app.post("/playlist-rename", (req, res) => {
  const username = req.body?.username
  const playlistID = req.body?.playlistID
  const name = req.body?.name

  var query = "UPDATE Playlist SET name = ? WHERE playlistID = ? AND username = ?";
    var val= [name, playlistID, username];
    var sql = mysql.format(query, val);

  con.query(sql,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

app.post("/playlist-create", (req, res) => {
  const username = req.body?.username
  const name = req.body?.name

  con.query(
    `INSERT INTO Playlist VALUES('${username}', UUID(), '${name}', curdate())`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

//get all artists for a given song
app.post("/get-Artist", (req, res) => {
  const songID = req.body?.songID
  
  con.query(
    `SELECT name FROM Artist WHERE Artist.artistID IN (SELECT artistID FROM SongAuthor WHERE SongAuthor.songID = '${songID}')`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

app.post("/playlist-add-song", (req, res) => {
  const username = req.body?.username
  const playlistID = req.body?.playlistID
  const songID = req.body?.songID

  con.query(
    `INSERT INTO PlaylistSong VALUES('${songID}', '${playlistID}', '${username}')`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

app.post("/playlist-remove-song", (req, res) => {
  const username = req.body?.username
  const playlistID = req.body?.playlistID
  const songID = req.body?.songID

  con.query(
    `DELETE FROM PlaylistSong WHERE songID='${songID}' AND playlistID='${playlistID}' AND username='${username}';`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
})

app.post("/playlist-delete", (req, res) => {
  const username = req.body?.username
  const playlistID = req.body?.playlistID

  con.query(
    `DELETE FROM Playlist WHERE username='${username}' AND playlistID='${playlistID}';`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

app.post("/users-get", (req, res) => {
  const username = req.body?.username

  con.query(
    `SELECT username FROM User;`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

app.post("/mutual-song-likes-get", (req, res) => {
  const username1 = req.body?.username1
  const username2 = req.body?.username2

  con.query(
    `SELECT Song.songID, Song.title, Song.releaseDate FROM SongLike, Song
    WHERE username="${username1}" AND Song.songID=SongLike.songID
    INTERSECT
    SELECT Song.songID, Song.title, Song.releaseDate FROM SongLike, Song
    WHERE username="${username2}" AND Song.songID=SongLike.songID;`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

// Search for artists
app.post("/search-artist", (req, res) => {
  const artistName = req.body?.artistName
  const username = req.body?.username

  const query = (artistName) ? 
  `WITH artistLikes as (
    SELECT artistID, count(songlike.songID) as artistSongLikes
    FROM songauthor
    LEFT OUTER JOIN songlike ON songauthor.songID=songlike.songID
    GROUP BY artistID
    )
    SELECT artist.artistID, name, artistSongLikes FROM artistLikes, artist WHERE artistLikes.artistID = artist.artistID and name LIKE '%${artistName}%' LIMIT 50;` : 
  `WITH artistLikes as (
    SELECT artistID, count(songlike.songID) as artistSongLikes
    FROM songauthor
    LEFT OUTER JOIN songlike ON songauthor.songID=songlike.songID
    GROUP BY artistID
    )
    SELECT artist.artistID, name, artistSongLikes FROM artistLikes, artist WHERE artistLikes.artistID = artist.artistID LIMIT 50`;  

  con.query(
    query,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

app.post("/artist-songs-get", (req, res) => {
  const artistID = req.body?.artistID
  const username = req.body?.username

  con.query(
    `WITH artistSong as 
    ( SELECT Song.songID, title, releaseDate FROM Song, SongAuthor
      WHERE artistID = "${artistID}" AND Song.songID=SongAuthor.songID)

    SELECT artistSong.songID as songID, title, releaseDate, totalLikes, userLikes
    FROM artistSong LEFT OUTER JOIN (
        SELECT songID, count(songID) as totalLikes, SUM(CASE WHEN SongLike.username='${username}' THEN 1 ELSE 0 END) as userLikes
        FROM SongLike
        GROUP BY songID
    ) AS SongLikeTotals ON artistSong.songID = SongLikeTotals.songID`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

// Search album name
app.post("/search-album-name", (req, res) => {
  const albumName = req.body?.albumName
  const username = req.body?.username

  const query = (albumName) ? 
  `SELECT Album.albumID as albumID, name, totalLikes, userLikes
  FROM Album LEFT OUTER JOIN (
      SELECT albumID, count(albumID) as totalLikes, SUM(CASE WHEN AlbumLike.username='${username}' THEN 1 ELSE 0 END) as userLikes
      FROM AlbumLike
      GROUP BY albumID
  ) AS AlbumLikeTotals ON Album.AlbumID = AlbumLikeTotals.AlbumID
  WHERE name LIKE '%${albumName}%' LIMIT 50;` : 
  `SELECT Album.albumID as albumID, name, totalLikes, userLikes
  FROM Album LEFT OUTER JOIN (
      SELECT albumID, count(albumID) as totalLikes, SUM(CASE WHEN AlbumLike.username='${username}' THEN 1 ELSE 0 END) as userLikes
      FROM AlbumLike
      GROUP BY albumID
  ) AS AlbumLikeTotals ON Album.albumID = AlbumLikeTotals.albumID
  LIMIT 50`;  
  con.query(
    query,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

app.post("/get-album-likes", (req, res) => {
  const albumID = req.body?.albumID

  con.query(
    `SELECT COUNT(*) AS totalLikes FROM AlbumLike WHERE albumID='${albumID}'`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  )
})

// Like/unlike an album
app.post("/like-album", (req, res) => {
  const albumID = req.body?.albumID
  const username = req.body?.username
  const liked = req.body?.selected

  const query = (liked) ?
  `INSERT INTO AlbumLike VALUES(${albumID}, '${username}')` :
  `DELETE FROM AlbumLike WHERE AlbumLike.albumID = ${albumID} AND AlbumLike.username = '${username}'`;

  con.query(
    query,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

app.post("/album-songs-get", (req, res) => {
  const albumID = req.body?.albumID
  const username = req.body?.username
  
  con.query(
    `WITH albumSong as 
    ( SELECT Song.songID, title, releaseDate FROM Song, SongAlbum
      WHERE albumID = "${albumID}" AND Song.songID=SongAlbum.songID)

    SELECT albumSong.songID as songID, title, releaseDate, totalLikes, userLikes
    FROM albumSong LEFT OUTER JOIN (
        SELECT songID, count(songID) as totalLikes, SUM(CASE WHEN SongLike.username='${username}' THEN 1 ELSE 0 END) as userLikes
        FROM SongLike
        GROUP BY songID
    ) AS SongLikeTotals ON albumSong.songID = SongLikeTotals.songID`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  );
});

app.post("/artist-song-likes-get", (req, res) => {
  const artistID = req.body?.artistID

  con.query(
    `SELECT COUNT(*) AS totalLikes FROM SongLike WHERE songID in 
      (SELECT DISTINCT SongID from SongAuthor where artistID="${artistID}");`,
    function (err, result, fields) {
      if (err) throw err;
      res.send({ result })
    }
  )
})
