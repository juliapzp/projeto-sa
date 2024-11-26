import React, { useState } from "react";
import "../css/Navbar.css";
import "../css/Login.css";
import logo from "../../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom"; // Importando useNavigate

const LoginCliente = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Usando o useNavigate para redirecionamento

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login-cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Enviando e-mail e senha
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso no login
        localStorage.setItem('user', JSON.stringify(data.user)); // Armazenar usuário no localStorage
        setSuccess(true);
        setError(""); // Limpar qualquer erro anterior
        setTimeout(() => {
          // Redireciona para a página do admin
          navigate("/"); // Alterado para redirecionar para a página do admin
        }, 2000);
      }
       else {
        setError(data.error || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="tela-logincliente">
      <div className="navbar">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="nav-buttons">
          <Link to="/Login">
            <button className="botao-entrar">Entrar</button>
          </Link>
          <Link to="/Cadastro">
            <button className="botao-cadastrar">
              <span className="gradient">Cadastrar</span>
            </button>
          </Link>
        </div>
      </div>
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <br />
          <br />
          <h4 className="bemvindo">Bem-Vindo Cliente</h4>
          <br />
          <label className="labelEmail" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email_cliente"
            name="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label className="labelAdmin" htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password_cliente"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
          <br />
          {error && <p className="error-message">{error}</p>} 
          {success && <p className="success-message">Login bem-sucedido!</p>} 
          <button type="submit" className="botao-logar">
            Logar
          </button>
          <Link to="/Recuperacao" className="link">
            Esqueci minha senha
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginCliente;
