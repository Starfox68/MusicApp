CREATE DATABASE music;
USE music;

CREATE TABLE Song (
    songID INTEGER NOT NULL PRIMARY KEY,
    title VARCHAR(255),
    imageURL VARCHAR(255),
    releaseDate DATE,
    lyrics TEXT
);

CREATE TABLE Artist (
    artistID INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE Album (
    albumID INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE SongAuthor (
    songID INTEGER NOT NULL,
    artistID INTEGER NOT NULL,
    PRIMARY KEY (songID, artistID),
    FOREIGN KEY (songID) REFERENCES Song(songID),
    FOREIGN KEY (artistID) REFERENCES Artist(artistID)
);

CREATE TABLE AlbumAuthor (
    albumID INTEGER NOT NULL,
    artistID I  NTEGER NOT NULL,
    PRIMARY KEY (albumID),
    FOREIGN KEY (albumID) REFERENCES Album(albumID),
    FOREIGN KEY (artistID) REFERENCES Artist(artistID)
);

CREATE TABLE SongAlbum (
    songID INTEGER NOT NULL,
    albumID INTEGER NOT NULL,
    PRIMARY KEY (albumID, songID),
    FOREIGN KEY (albumID) REFERENCES Album(albumID),
    FOREIGN KEY (songID) REFERENCES Song(songID)
);

CREATE TABLE User (
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255)
);

CREATE TABLE SongLike (
    songID INTEGER NOT NULL,
    username VARCHAR(255) NOT NULL,
    PRIMARY KEY (songID, username),
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (songID) REFERENCES Song(songID)
);

CREATE TABLE AlbumLike (
    albumID INTEGER NOT NULL,
    username VARCHAR(255) NOT NULL,
    PRIMARY KEY (albumID, username),
    FOREIGN KEY (username) REFERENCES User(username),
    FOREIGN KEY (albumID) REFERENCES Album(albumID)
);

CREATE TABLE Playlist (
    username VARCHAR(255) NOT NULL,
    playlistID INTEGER NOT NULL,
    name VARCHAR(255),
    dateCreated DATE,
    PRIMARY KEY (username, playlistID),
    FOREIGN KEY (username) REFERENCES User(username)
);

CREATE TABLE PlaylistSong (
    songID INTEGER NOT NULL,
    playlistID INTEGER NOT NULL,
    username VARCHAR(255) NOT NULL,
    PRIMARY KEY (songID, playlistID, username),
    FOREIGN KEY (username, playlistID) REFERENCES Playlist(username, playlistID),
    FOREIGN KEY (songID) REFERENCES Song(songID)
);