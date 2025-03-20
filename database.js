// const sqlite3 = require("sqlite3").verbose();

// // Connect to SQLite database (creates 'database.db' if it doesn't exist)
// const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err.message);
//   } else {
//     console.log("Connected to the SQLite database.");
//   }
// });

// // Create Table if not exists
// db.run(
//   `CREATE TABLE IF NOT EXISTS crime_reports (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     name TEXT,
//     gender TEXT,
//     age INTEGER,
//     state TEXT,
//     address TEXT,
//     platform TEXT,
//     profileId TEXT,
//     url TEXT,
//     contentType TEXT,
//     targetType TEXT,
//     crimeNumber TEXT,
//     firDate TEXT,
//     accusedStatus TEXT,
//     chargesheetDate TEXT,
//     policeStation TEXT,
//     profilePhoto TEXT,
//     postPhoto TEXT,
//     firFile TEXT,
//     otherFiles TEXT
//   )`
// );

// module.exports = db;
