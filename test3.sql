SELECT songIDs.title, Artist.name
FROM (
    SELECT songID, title
    FROM PlaylistSong, Song
    WHERE username="currentUser"
    AND playlistID="currentPlaylistID"
    AND PlaylistSong.songID=Song.songID
) as songIDs, SongAuthor, Artist
WHERE songIDs.songID=SongAuthor.songID
AND SongAuthor.artistID = Artist.artistID