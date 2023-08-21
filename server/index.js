const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "senha1234",
    database: "banco",
})

app.use(express.json())
app.use(cors())

app.post("/register", (req, res) => {
    const email = req.body.email;

    db.query(
        "SELECT * FROM usuarios WHERE email=?", [email], (err, result) => {
        if(err) {
            res.send(err)
            return
        }
        res.send(result);
    })
})

app.listen(3001, () => {
    console.log("rodando na porta 3001")
})

