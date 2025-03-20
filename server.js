const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error("Database connection error:", err);
    } else {
      console.log("Connected to SQLite database.");
    }
  });

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads/")); // Store in backend/uploads/
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Handle form submission with file uploads
app.post("/submit-form", upload.fields([
  { name: "profilePhoto", maxCount: 1 },
  { name: "postPhoto", maxCount: 1 },
  { name: "firFile", maxCount: 1 },
  { name: "otherFiles", maxCount: 10 },
]), (req, res) => {
  const { name, gender, age, state, address, platform, profileId, url, contentType, targetType, crimeNumber, firDate, accusedStatus, chargesheetDate, policeStation } = req.body;

  const profilePhoto = req.files["profilePhoto"] ? req.files["profilePhoto"][0].filename : null;
  const postPhoto = req.files["postPhoto"] ? req.files["postPhoto"][0].filename : null;
  const firFile = req.files["firFile"] ? req.files["firFile"][0].filename : null;
  const otherFiles = req.files["otherFiles"] ? req.files["otherFiles"].map(file => file.filename).join(",") : null;

  const sql = `INSERT INTO crime_reports 
    (name, gender, age, state, address, platform, profileId, url, contentType, targetType, crimeNumber, firDate, accusedStatus, chargesheetDate, policeStation, profilePhoto, postPhoto, firFile, otherFiles) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [name, gender, age, state, address, platform, profileId, url, contentType, targetType, crimeNumber, firDate, accusedStatus, chargesheetDate, policeStation, profilePhoto, postPhoto, firFile, otherFiles];

  db.run(sql, values, function (err) {
    if (err) {
      console.error("Error inserting data:", err.message);
      res.status(500).json({ message: "Database error", error: err.message });
    } else {
      res.status(200).json({ message: "Form submitted successfully!", id: this.lastID });
    }
  });
});


// Fetch all crime reports
app.get("/api/crime-reports", (req, res) => {
    const query = "SELECT * FROM crime_reports";
    db.all(query, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    });
  });

  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
