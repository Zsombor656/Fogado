const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const port= 3000
app.use(cors());

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    port: "3307",
    password: "",
    database: "fogado"
}); 

app.get("/", (req, res) => {
  res.send("Fut a backend!");
  })
  app.listen(port, () => {
    console.log(`Szerver fut: http://localhost:${port}`);
    });

app.get("/szobak", (req, res) => {
    const sql = "SELECT sznev, agy FROM `szobak`;";
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        return res.json(result);
    });
});

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
      console.error("Lekérdezési hiba:", err);
      res.status(500).send("Adatbázis hiba");
    } else {
      res.json(result);
    }
  });
});
