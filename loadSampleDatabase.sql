INSERT INTO Song VALUES (1, "Despacito", "https://t2.genius.com/unsafe/307x307/https%3A%2F%2Fimages.genius.com%2Fd01f15b3cec316f3baef2fb637ef8305.1000x1000x1.jpg", "2017-1-13", "Tú, tú eres el imán y yo soy el metal. Me voy acercando y voy armando el plan. Sólo con pensarlo se acelera el pulso (¡Oh, yeah!)");
INSERT INTO Artist VALUES(1, "Luis Fonsi");
INSERT INTO Album VALUES (1, "VIDA");

INSERT INTO SongAuthor VALUES(1, 1);
INSERT INTO SongAlbum VALUES (1, 1);
INSERT INTO AlbumAuthor VALUES (1, 1);

INSERT INTO Song VALUES (2, "Cyanide", "https://t2.genius.com/unsafe/327x327/https%3A%2F%2Fimages.genius.com%2F186e7c3b8838ed2ff06014efe1fb7d32.1000x1000x1.png", "2019-06-28", "Yeah, inside di ting dem call sweet melody. Wahpm gyal, u comin' like a family enuh, eee! Inside fi dem call DC is a d gyal dem, please");
INSERT INTO Artist VALUES(2, "Daniel Caeser");

INSERT INTO SongAuthor VALUES(2, 2);

INSERT INTO Song VALUES (3, "Despacito2", "https://t2.genius.com/unsafe/307x307/https%3A%2F%2Fimages.genius.com%2Fd01f15b3cec316f3baef2fb637ef8305.1000x1000x1.jpg", "2017-1-13", "Tú, tú eres el imán y yo soy el metal. Me voy acercando y voy armando el plan. Sólo con pensarlo se acelera el pulso (¡Oh, yeah!)");
INSERT INTO SongAuthor VALUES (3,1);


INSERT INTO User VALUES ("user1", "$2b$10$PsK6J20/BrE00FD5S2XgKu1iLcIiRIFjyn3Zgwn0kUeXLx9FsxWq.");
INSERT INTO User VALUES ("user2", "$2b$10$Troa30yc268bXgeUMFVoCOkXOwOo.REo7.oYntUisH5pWvuHYpsVa");

INSERT INTO Playlist VALUES ("user1", 1, "coolsongs", CONVERT(date, '2022-10-19'))

INSERT INTO PlaylistSong VALUES (1, 1, "user1");

INSERT INTO SongLike VALUES(1,"user1");
INSERT INTO SongLike VALUES(1,"user2");
INSERT INTO SongLike VALUES(3, "user1");

