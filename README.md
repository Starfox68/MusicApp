# Loading the sample database
## Create a mysql user with username musicUser and password Ilovedatabases:
Sign into mysql as the root user: `mysql -u root -p`
Enter your root password to the password prompt
Create a user with username 'musicUser' and password 'Ilovedatabases': `CREATE USER 'musicUser'@'localhost' IDENTIFIED BY 'Ilovedatabases;`
Grant the user admin privileges: `GRANT ALL PRIVILEGES ON *.* TO 'musicUser'@'localhost' WITH GRANT OPTION;`
Reload and apply the privileges: `FLUSH PRIVILEGES;`

## Execute the database creation scripts
Login as the musicUser `mysql -u musicUser -p`
Enter the password "Ilovedatabases" to the password prompt
Once logged in to the MySQL shell, create the database schema: `source createTable.sql;`
Load the sample database: `source loadSampleDatabase.sql;`

# Running the application
To run the application, run 'npm install' in the musicapp folder
In this same terminal window, now run 'node server.js'

In a new terminal tab in the musicapp folder run 'npm start'

# Features
The application currently supports searching for songs by song name