# Database setup
## Create a mysql user with username musicUser and password Ilovedatabases:
Sign into mysql as the root user: `mysql -u root -p`
Enter your root password to the password prompt
Create a user with username 'musicUser' and password 'Ilovedatabases': `CREATE USER 'musicUser'@'localhost' IDENTIFIED BY 'Ilovedatabases;`
Grant the user admin privileges: `GRANT ALL PRIVILEGES ON *.* TO 'musicUser'@'localhost' WITH GRANT OPTION;`
Reload and apply the privileges: `FLUSH PRIVILEGES;`

# Loading sample data
Login as the musicUser `mysql -u musicUser -p`
Enter the password "Ilovedatabases" to the password prompt
Once logged in to the MySQL shell, create the database schema: `source createTable.sql;`
Load the sample database: `source loadSampleDatabase.sql;`

# Loading production data
Login as the musicUser `mysql -u musicUser -p`
You may need to run mysql with the flag --local-infile=1, since the sql script loads data from using LOAD DATA LOCAL INFILE
Enter the password "Ilovedatabases" to the password prompt
Once logged in to the MySQL shell, create the database schema: `source createTable.sql;`
Load the sample database: `source loadProductionDatabase.sql;`

# Running the application
To run the application, run `npm install` in the musicapp folder
In this same terminal window, now run `node server.js`

In a new terminal tab in the musicapp folder run `npm start`

# Features
1. Logging in / creating users. An example user is username: user1 password: password1
2. Searching for songs by song title
3. Liking songs and viewing total song likes from other users
4. Sorting songs by song likes
5. Creating, renaming, and deleting playlists
6. Adding songs to playlists
7. Viewing other users and their mutually liked songs
8. Searching for artists and sorting by an artist's total likes
9. Searching for albums, liking albums, and sorting 