const express = require('express');
const cors = require('cors');
const connection = require('./db');
const app = express();
const PORT = 3000;

app.use(cors()); // Habilita CORS para todas as rotas
app.use(express.json()); // Para suportar JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // Para suportar bodies codificados em URL

app.post("/users", (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }
    const sql = "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)";
    connection.query(sql, [name, email, phone], (err, results) => {
        if (err) {
            console.error("Erro ao inserir dados no banco de dados:", err);
            return res.status(500).json({ error: "Erro ao salvar os dados." });
        }
        res.status(201).json({ message: "Dados salvos com sucesso!", userId: results.insertId });
    });
});    

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});