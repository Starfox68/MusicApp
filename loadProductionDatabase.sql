INSERT INTO User VALUES ("user1", "$2b$10$09t9W5V1Q7kg070O00.zP.ZSG5ingE7rOzpmiUkiv/M5bGEH8Ou1.");
INSERT INTO User VALUES ("user2", "$2b$10$8lRReDtnVby9kQg9ojL/HOLh8Jap6U/FkNaEdmV6m7Y/cvPvo5CiW");
INSERT INTO User VALUES ("user3", "$2b$10$IDEPMpMx5I1CsYWHdf.f4eZ2rDxJYmSpH2l3pyKaSfLRUrxfxYEB2");

LOAD DATA LOCAL INFILE 'song.csv'
INTO TABLE Song
FIELDS TERMINATED BY '^'
LINES TERMINATED BY '\n';

INSERT INTO SongLike VALUES(745882,"user1");
INSERT INTO SongLike VALUES(645767, "user1");
INSERT INTO SongLike VALUES(884600, "user1");
INSERT INTO SongLike VALUES(915420,"user2");
INSERT INTO SongLike VALUES(745882, "user2");
INSERT INTO SongLike VALUES(645767, "user2");
INSERT INTO SongLike VALUES(645767, "user3");
INSERT INTO SongLike VALUES(745882, "user3");

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

INSERT INTO Playlist VALUES ("user1", 1, "Good Songs", STR_TO_DATE('15/08/2022', '%d/%m/%Y'));

INSERT INTO Playlist VALUES ("user1", 2, "Great Songs", STR_TO_DATE('05/08/2022', '%d/%m/%Y'));

INSERT INTO PlaylistSong VALUES (843135, 1, "user1");
INSERT INTO PlaylistSong VALUES (508957, 1, "user1");
INSERT INTO PlaylistSong VALUES (745882, 2, "user1");
