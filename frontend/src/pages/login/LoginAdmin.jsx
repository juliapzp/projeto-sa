import React, { useState } from "react";
import "../css/Navbar.css";
import "../css/Login.css";
import logo from "../../assets/logo1.png";
import { Link, useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso no login
        localStorage.setItem('admin', JSON.stringify(data.admin)); // Guardando admin no localStorage
        setSuccess(true);
        setError(""); // Limpar qualquer erro anterior
        setTimeout(() => {
          // Redireciona para a página do admin
          navigate("/"); // Alterado para redirecionar para a página do admin
        }, 2000);
      } else {
        setError(data.error || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="tela-loginadmin">
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
          <h4 className="bemvindo">Bem-Vindo Admin</h4>
          <br />
          <label className="labelUsuario" htmlFor="usuario">Usuario:</label>
          <input
            type="text"
            id="usuario_admin"
            name="usuario"
            placeholder="Digite seu usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <br />
          <label className="labelSenha" htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password_admin"
            name="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="botao-logar">Entrar</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">Login realizado com sucesso! Redirecionando...</p>}
      </div>
    </div>
  );
};

export default LoginAdmin;
