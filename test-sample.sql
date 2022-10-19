-- feature 1
SELECT title, releaseDate FROM Song WHERE title="Despacito";

-- feature 2
SELECT artistID, count(songlike.songID) as artistSongLikes
FROM songauthor
LEFT OUTER JOIN songlike ON songauthor.songID=songlike.songID
GROUP BY artistID;

-- feature 3
SELECT songIDs.title, Artist.name
FROM (
    SELECT Song.songID, title
    FROM PlaylistSong, Song
    WHERE username="user1"
    AND playlistID=1
    AND PlaylistSong.songID=Song.songID
) as songIDs, SongAuthor, Artist
WHERE songIDs.songID=SongAuthor.songID
AND SongAuthor.artistID = Artist.artistID;

-- feature 4
INSERT INTO PlaylistSong (SongID, PlaylistID, Username)
VALUES (2, 1, "user1");

SELECT songIDs.title, Artist.name -- display user1's playlist using feature 3 after adding song
FROM (
    SELECT Song.songID, title
    FROM PlaylistSong, Song
    WHERE username="user1"
    AND playlistID=1
    AND PlaylistSong.songID=Song.songID
) as songIDs, SongAuthor, Artist
WHERE songIDs.songID=SongAuthor.songID
AND SongAuthor.artistID = Artist.artistID;