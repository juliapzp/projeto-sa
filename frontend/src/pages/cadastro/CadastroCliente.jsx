import React, { useState } from "react";
import "../css/Navbar.css";
import "../css/Cadastro.css";
import logo from "../../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";

const CadastroCliente = () => {
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não correspondem.");
      return;
    }

    const cpfClean = cpf.replace(/\D/g, ''); // Remove tudo que não for número

    const cpfRegex = /^\d{11}$/;
    if (!cpfRegex.test(cpfClean)) {
      setError("O CPF deve conter 11 números.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/cadastro-cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, cpf: cpfClean, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess(true);
        setError("");
        setEmail("");
        setCpf("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => navigate("/Login"), 2000); // Redireciona para o login após 2 segundos
      } else {
        setError(data.error || "Erro ao cadastrar.");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="tela-cadastrocliente">
      <div className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="nav-buttons">
          <button onClick={() => navigate("/Login")} className="botao-entrar">
            Entrar
          </button>
          <button
            onClick={() => navigate("/Cadastro")}
            className="botao-cadastrar"
          >
            <span className="gradient">Cadastrar</span>
          </button>
        </div>
      </div>
      <div className="cadastro-container">
        <form onSubmit={handleSubmit}>
          <h4 className="bemvindo">Cadastrar-se</h4>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email_cliente"
            name="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf_cliente"
            name="cpf"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password_cliente"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="confirmPassword">Confirme a senha:</label>
          <input
            type="password"
            id="confirm_password_cliente"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          {success && (
            <p className="success-message">Cadastro realizado com sucesso!</p>
          )}
          <button type="submit" className="botao-cadastro">
            Cadastrar-se
          </button>
          <Link to="/Login" className="botao-ja-tem">
            Já tem uma conta?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CadastroCliente;
