const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "senha1234",
    database: "banco",
})

app.get('/', (rep, res) => {
    db.query("INSERT INTO usuarios (email, password) VALUES('carlos@gmail.com', '12345678')"
    );
})

// app.get('/', async (req, res) => {
//     try {
//         const result = await db.query("INSERT INT usuarios (email, password) VALUES ('carlos@gmail.com', '12345678')");
//         console.log("Registro inserido com sucesso :", result);
//         res.status(200).send("Registro inserido com sucesso");
//     } catch (error) {
//         console.error("Erro ao inserir registro:", error);
//         res.status(500).send("Erro ao inserir registro");
//     }
// });

app.listen(3001, () => {
    console.log("rodando na porta 3001")
})