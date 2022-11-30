USE music

-- feature 1
SELECT title, releaseDate, TotalLikes, UserLikes
FROM Song LEFT OUTER JOIN (
    SELECT songID, count(songID) as TotalLikes, SUM(CASE WHEN SongLike.username="user1" THEN 1 ELSE 0 END) as UserLikes
    FROM SongLike
    GROUP BY songID
) AS SongLikeTotals ON Song.songID = SongLikeTotals.songID
WHERE title LIKE '%Despacito%';

-- feature 2
SELECT artistID, count(songlike.songID) as artistSongLikes
FROM songauthor
LEFT OUTER JOIN songlike ON songauthor.songID=songlike.songID
GROUP BY artistID;

-- feature 3
SELECT DISTINCT playlistID, name 
FROM Playlist 
WHERE username = 'user1' AND playlistID NOT IN (
    SELECT playlistID FROM PlaylistSong WHERE songID = '2'
);

-- feature 4
INSERT INTO PlaylistSong (SongID, PlaylistID, Username) VALUES (2, 1, "user1");
-- Testing feature 4
SELECT songID FROM PlaylistSong WHERE username="user1" AND playlistID = 1;

-- feature 5
SELECT Song.songID, Song.title, Song.releaseDate 
FROM SongLike, Song
WHERE username='user1' AND Song.songID=SongLike.songID
INTERSECT
SELECT Song.songID, Song.title, Song.releaseDate FROM SongLike, Song
WHERE username='user2' AND Song.songID=SongLike.songID;

-- feature 6
DELETE FROM SongLike 
WHERE username="user1" AND songID=1;
-- Testing feature 6
SELECT Song.songID, Song.title, Song.releaseDate 
FROM SongLike, Song
WHERE username='user1' AND Song.songID=SongLike.songID
INTERSECT
SELECT Song.songID, Song.title, Song.releaseDate FROM SongLike, Song
WHERE username='user2' AND Song.songID=SongLike.songID;