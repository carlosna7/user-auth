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

function errorHandler(res, msg, status = 500) {
    console.error(msg);
    res.status(status).json({ msg: "Erro no servidor" });
}

// app.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	const password = req.body.password;

// 	db.query(
// 		"SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
// 			if (err) {
// 				// res.send(err) // exibir o erro "err" está dando problema, abaixo é melhor
// 				res.status(500).json({ msg: "Erro no servidor" })
// 				return;
// 			}

// 			if (result.length > 0) {
// 				const hashPassword = result[0].password;

// 				bcrypt.compare(password, hashPassword, (erro, response) => {
// 					if (erro) {
// 						// res.send(erro) // exibir o erro "err" está dando problema, abaixo é melhor
// 						res.status(500).json({ msg: "Erro no servidor" })
// 						return;
// 					}

// 					if (response) {
// 						res.send(response) // true
// 						// res.send(result) // causa erro no nodemon
// 						res.json({ msg: "Login bem-sucedido" })
// 					} else {
// 						res.send(response) // false
// 						res.status(401).json({ msg: "Email ou Senha incorretos!" })
// 					}
// 				})
// 			} else {
// 				res.status(401).json({ msg: "Usuário não registrado!" })
// 			}
// 		}
// 	)
// })

// app.post("/register", (req, res) => {
// 	const email = req.body.email;
// 	const password = req.body.password;

// 	db.query(
// 		"SELECT * FROM usuarios WHERE email=?", [email], (err, result) => {
// 			if(err) {
// 				res.send(err)
// 				return;
// 			}

// 		if(result.length === 0) {
// 			bcrypt.hash(password, saltRounds, (err, hash) => {
// 				db.query(
// 					"INSERT INTO usuarios (email, password) VALUES (?, ?)", [email, hash], (erro, result) => {
// 						if(erro) {
// 							res.send(erro)
// 							return;
// 						}
// 						res.send({ msg: "Usuarios cadastrado com sucesso" });
// 					}
// 				)
// 			})
			
// 		} else {
// 			res.send({msg: "Email já cadastrado"})
// 		}
// 	})
// })

// app.listen(3001, () => {
// 	console.log("rodando na porta 3001")
// })

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const [result] = await db.promise().query("SELECT * FROM usuarios WHERE email = ?", [email]);

        if (result.length > 0) {
            const hashPassword = result[0].password;

            const response = await bcrypt.compare(password, hashPassword);

            if (response) {
                res.send({ success: true, msg: "Login bem-sucedido" });
            } else {
				res.send({ success: false, msg: "Email ou senha incorreto!"})
                // res.status(401).json({ msg: "Email ou Senha incorretos!" });
            }
        } else {
			res.send({ success: false, msg: "Usuário não registrado!"})
            // res.status(401).json({ msg: "Usuário não registrado!" });
        }
    } catch (err) {
        errorHandler(res, "Erro ao fazer login", err);
    }
});

app.post("/register", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const [existingUser] = await db.promise().query("SELECT * FROM usuarios WHERE email=?", [email]);

        if (existingUser.length === 0) {
            const hash = await bcrypt.hash(password, saltRounds);
            await db.promise().query("INSERT INTO usuarios (email, password) VALUES (?, ?)", [email, hash]);
            res.send({ msg: "Usuário cadastrado com sucesso!" });
        } else {
            res.send({msg: "Email já cadastrado!"})
        }
    } catch (err) {
        errorHandler(res, "Erro ao cadastrar usuário!", err);
    }
});

app.listen(3001, () => {
	console.log("Rodando na porta 3001");
});