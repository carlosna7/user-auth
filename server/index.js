const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "senha1234",
	database: "banco",
})

app.use(express.json())
app.use(cors())

// app.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	const password = req.body.password;

// 	db.query(
// 		"SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {

			// if(err) {
			// 	// res.send(err) exibir o erro "err" está dando problema, abaixo é melhor
			// 	res.status(500).json({ error: "Erro no servidor" })
			// 	return;
			// }

// 			if(result.length > 0) {
// 				const storedHash = result[0].password;

// 				bcrypt.compare(password, storedHash, (erro, response) => {

// 					if (erro) {
// 						res.send(erro);
// 					}
// 					if(response) {
// 						res.send(response)
// 						// res.send({msg: "Usuario logado!"})
// 					} else {
// 						res.send(response)
// 						// res.send({msg: "Senha incorreta!"})
// 					}
// 				})
// 			} else {
// 				res.send({msg: "Conta não encontrada!"})
// 			}
// 		}
// 	)
// })

app.post("/login", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	db.query(
		"SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
			if (err) {
				res.status(500).json({ error: "Erro no servidor" })
				return;
			}

			if (result.length > 0) {
				const hashedPassword = result[0].password; // Obtém a senha hashada do banco de dados

				bcrypt.compare(password, hashedPassword, (err, response) => {
					if (err) {
						res.status(500).json({ error: "Erro no servidor" })
						return;
					}

					if (response) {
						res.send(response) // true
						// res.send(result) // causa erro no nodemon
						res.json({ msg: "Login bem-sucedido" })
					} else {
						res.status(401).json({ msg: "Email ou Senha incorretos!" })
					}
				})
			} else {
				res.status(401).json({ msg: "Usuário não registrado!" })
			}
		}
	)
})

app.post("/register", (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	db.query(
		"SELECT * FROM usuarios WHERE email=?", [email], (err, result) => {

			if(err) {
				res.send(err)
				return;
			}

		if(result.length === 0) {
			bcrypt.hash(password, saltRounds, (err, hash) => {
				db.query(
					"INSERT INTO usuarios (email, password) VALUES (?, ?)", [email, hash], (erro, result) => {
						
						if(erro) {
							res.send(erro)
							return;
						}
						res.send({ msg: "Usuarios cadastrado com sucesso" });
					}
				)
			})
			
		} else {
			res.send({msg: "Email já cadastrado"})
		}
	})
})

app.listen(3001, () => {
	console.log("rodando na porta 3001")
})

