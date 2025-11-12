const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'modajovem',
});

app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});


app.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;

  const hashedPassword = await bcrypt.hash(senha, 10);
  db.query(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id: result.insertId });
    }
  );
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(401).json({ error: 'Usuário não encontrado' });

    const user = results[0];
    const senhaOk = await bcrypt.compare(senha, user.senha);
    if (!senhaOk) return res.status(401).json({ error: 'Senha incorreta' });

    res.json({ id: user.id, nome: user.nome, email: user.email });
  });
});

//lista de compras do usuario
// GET /compras/:usuarioId
app.get('/compras/:usuarioId', (req, res) => {
  const { usuarioId } = req.params;

  const sql = `
    SELECT c.id, c.quantidade, c.data_compra, p.nome AS nome_produto
    FROM compras c
    JOIN produtos p ON c.produto_id = p.id
    WHERE c.usuario_id = ?
  `;

  db.query(sql, [usuarioId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao buscar compras' });
    }
    res.json(results);
  });
});

// POST /comprar
app.post('/comprar', (req, res) => {
  const { usuario_id, produto_id, quantidade } = req.body;

  const sql = 'INSERT INTO compras (usuario_id, produto_id, quantidade) VALUES (?, ?, ?)';
  db.query(sql, [usuario_id, produto_id, quantidade || 1], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao registrar a compra.' });
    }
    res.status(200).json({ mensagem: 'Compra registrada com sucesso!' });
  });
});


app.listen(3001, () => {
  console.log('Servidor backend rodando na porta 3001');
});