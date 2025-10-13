const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const port = 3000;

app.use(cors());

// Adatbázis kapcsolat
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  port: "3307",
  password: "",
  database: "fogado",
});

// Adatbázis kapcsolat ellenőrzése
db.connect((err) => {
  if (err) {
    console.error("Adatbázis kapcsolat hiba:", err);
    process.exit(1); // Kilépés, ha nem sikerül csatlakozni
  }
  console.log("Sikeres adatbázis kapcsolat!");
});

// Alapértelmezett végpont
app.get("/", (req, res) => {
  res.send("Fut a backend!");
});

// Szerver indítása
app.listen(port, () => {
  console.log(`Szerver fut: http://localhost:${port}`);
});

// Szobák lekérdezése
app.get("/szobak", (req, res) => {
  const sql = "SELECT sznev, agy FROM `szobak`;";
  db.query(sql, (err, result) => {
    if (err) {
      console.error("Lekérdezési hiba /szobak:", err);
      return res.status(500).send("Adatbázis hiba");
    }
    return res.json(result);
  });
});

// Kihasználtság lekérdezése
app.get("/kihasznaltsag", (req, res) => {
  const sql = `
    SELECT 
      szobak.sznev AS szoba,
      COUNT(DISTINCT foglalasok.vendeg) AS vendegek,
      SUM(DATEDIFF(foglalasok.tav, foglalasok.erk)) AS vendegejszakak
    FROM szobak
    INNER JOIN foglalasok ON szobak.szazon = foglalasok.szoba
    GROUP BY szobak.szazon, szobak.sznev
    ORDER BY vendegejszakak ASC, vendegek ASC;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Lekérdezési hiba /kihasznaltsag:", err);
      return res.status(500).send("Adatbázis hiba");
    }
    return res.json(result);
  });
});


app.get("/szoba-foglaltsag", (req, res) => {
  const sql = `
    SELECT 
      szobak.sznev AS Szobanév,
      foglalasok.erk AS Érkezés,
      foglalasok.tav AS Távozás
    FROM foglalasok
    JOIN szobak ON foglalasok.szoba = szobak.szazon
    ORDER BY szobak.sznev ASC, foglalasok.erk ASC;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Lekérdezési hiba /szoba-foglaltsag:", err);
      return res.status(500).send("Adatbázis hiba");
    }
    return res.json(result);
  });
});