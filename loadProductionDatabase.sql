INSERT INTO User VALUES ("user1", "password1");
INSERT INTO User VALUES ("user2", "password2");

INSERT INTO User VALUES ("user10", "$2b$10$PsK6J20/BrE00FD5S2XgKu1iLcIiRIFjyn3Zgwn0kUeXLx9FsxWq.")
INSERt INTO User VALUES ("user11", "$2b$10$Troa30yc268bXgeUMFVoCOkXOwOo.REo7.oYntUisH5pWvuHYpsVa")


LOAD DATA LOCAL INFILE 'song.csv'
INTO TABLE Song
FIELDS TERMINATED BY '^'
LINES TERMINATED BY '\n';

INSERT INTO SongLike VALUES(745882
,"user1");
INSERT INTO SongLike VALUES(915420
,"user2");
INSERT INTO SongLike VALUES(645767
, "user1");

LOAD DATA LOCAL INFILE 'artist.csv'
INTO TABLE Artist
FIELDS TERMINATED BY '^'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE 'album.csv'
INTO TABLE Album
FIELDS TERMINATED BY '^'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE 'artistSong.csv'
INTO TABLE SongAuthor
FIELDS TERMINATED BY '^'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE 'songAlbum.csv'
INTO TABLE SongAlbum
FIELDS TERMINATED BY '^'
LINES TERMINATED BY '\n';

LOAD DATA LOCAL INFILE 'albumArtist.csv'
INTO TABLE AlbumAuthor
FIELDS TERMINATED BY '^'
LINES TERMINATED BY '\n';

INSERT INTO Playlist VALUES ("user1", 1, "coolsongs", STR_TO_DATE('15/08/2022', '%d/%m/%Y'));

INSERT INTO PlaylistSong VALUES (843135, 1, "user1");
