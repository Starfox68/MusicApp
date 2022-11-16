-- feature 1
SELECT title, releaseDate, count(SongLike.songID) as TotalLikes, SUM(CASE WHEN SongLike.username="user1" THEN 1 ELSE 0 END) as UserLikes
FROM Song, SongLike
WHERE title="Despacito" AND SongLike.songID=Song.songID;

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

-- feature 5
WITH mutualLikedSongs AS
    (SELECT Song.songID FROM SongLike, Song
    WHERE username="user1" AND Song.songID=SongLike.songID
    INTERSECT
    SELECT Song.songID FROM SongLike, Song
    WHERE username="user2" AND Song.songID=SongLike.songID)
SELECT COUNT(songID) as numMutualLikedSongs FROM mutualLikedSongs;

-- feature 6
DELETE FROM SongLike 
WHERE username="user1" AND songID=1;

WITH mutualLikedSongs AS -- display mutual songs after removing a like from one of the songs
    (SELECT Song.songID FROM SongLike, Song
    WHERE username="user1" AND Song.songID=SongLike.songID
    INTERSECT
    SELECT Song.songID FROM SongLike, Song
    WHERE username="user2" AND Song.songID=SongLike.songID)
SELECT COUNT(songID) as numMutualLikedSongs FROM mutualLikedSongs;