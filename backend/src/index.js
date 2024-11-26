const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Configuração da conexão com o banco de dados PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "acsiv",
  password: "senai",
  port: 5432,
});

app.use(cors());
app.use(express.json());

// ----------------- LOGIN E CADASTRO DE ADMIN -----------------

// Endpoint de login para admin
app.post("/login-admin", async (req, res) => {
  const { usuario, password } = req.body;

  console.log("Dados recebidos no backend para login de admin:", { usuario, password });

  // Verificando se o usuário e a senha foram enviados
  if (!usuario || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
  }

  try {
    // Buscando o admin no banco de dados pelo usuário
    const result = await pool.query("SELECT * FROM admin WHERE usuario = $1", [usuario]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Usuário não encontrado." });
    }

    const admin = result.rows[0];

    // Comparando a senha informada com a senha armazenada (sem criptografia)
    if (password !== admin.senha) {
      return res.status(400).json({ error: "Senha incorreta." });
    }

    // Caso o login seja bem-sucedido, retornamos os dados do admin
    res.status(200).json({ message: "Login bem-sucedido", admin: admin });

  } catch (err) {
    console.error("Erro no servidor:", err.message);
    res.status(500).json({ error: "Erro ao fazer login." });
  }
});

// Endpoint de cadastro de admin
app.post("/cadastro-admin", async (req, res) => {
  const { usuario, password } = req.body;

  console.log("Dados recebidos no backend para cadastro de admin:", { usuario, password });

  // Verificando se os campos obrigatórios foram enviados
  if (!usuario || !password) {
    return res.status(400).json({ error: "Usuário e senha são obrigatórios." });
  }

  try {
    // Verificando se o usuário já existe no banco de dados
    const userCheck = await pool.query("SELECT * FROM admin WHERE usuario = $1", [usuario]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ error: "Usuário já cadastrado." });
    }

    // Inserindo o novo admin no banco de dados (sem criptografar a senha)
    const result = await pool.query(
      "INSERT INTO admin (usuario, senha) VALUES ($1, $2) RETURNING *",
      [usuario, password]  // Senha em texto simples
    );

    // Retornando o admin cadastrado
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro no servidor:", err.message);
    res.status(500).json({ error: "Erro ao cadastrar admin." });
  }
});

// ----------------- LOGIN E CADASTRO DE CLIENTE -----------------

// Endpoint de login de cliente
app.post("/login-cliente", async (req, res) => {
  const { email, password } = req.body;

  console.log("Dados recebidos no backend para login de cliente:", { email, password });

  // Verificando se o e-mail e a senha foram enviados
  if (!email || !password) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  try {
    // Buscando o cliente no banco de dados pelo e-mail
    const result = await pool.query("SELECT * FROM clientes WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ error: "Email não encontrado." });
    }

    const client = result.rows[0];

    // Comparando a senha informada com a senha armazenada 
    if (password !== client.senha) {
      return res.status(400).json({ error: "Senha incorreta." });
    }

    // Caso o login seja bem-sucedido, retornamos os dados do cliente
    res.status(200).json({ message: "Login bem-sucedido", client: client });

  } catch (err) {
    console.error("Erro no servidor:", err.message);
    res.status(500).json({ error: "Erro ao fazer login." });
  }
});

// Endpoint de cadastro de cliente
app.post("/cadastro-cliente", async (req, res) => {
  const { email, cpf, password } = req.body;

  console.log("Dados recebidos no backend para cadastro de cliente:", { email, cpf, password });

  // Verificando se todos os campos obrigatórios foram enviados
  if (!email || !cpf || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  // Verificação de formato de CPF
  const cpfRegex = /^\d{11}$/;
  if (!cpfRegex.test(cpf)) {
    return res.status(400).json({ error: "O CPF deve conter 11 números." });
  }

  try {
    // Verificando se o email já existe no banco de dados
    const emailCheck = await pool.query("SELECT * FROM clientes WHERE email = $1", [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: "Email já cadastrado." });
    }

    // Inserindo os dados do novo cliente no banco de dados
    const result = await pool.query(
      "INSERT INTO clientes (email, cpf, senha) VALUES ($1, $2, $3) RETURNING *",
      [email, cpf, password]  // Senha em texto simples
    );

    // Retornando o cliente cadastrado
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Erro no servidor:", err.message);
    res.status(500).json({ error: "Erro ao cadastrar cliente." });
  }
});

// Endpoint de listagem de clientes (opcional, para testes)
app.get("/clientes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM clientes");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro no servidor:", err.message);
    res.status(500).json({ error: "Erro ao buscar clientes." });
  }
});

// Iniciando o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
