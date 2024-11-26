import React, { useState } from "react";
import "../css/Navbar.css";
import "../css/Recuperacao.css";
import logo from "../../assets/logo1.png";
import { Link } from "react-router-dom";

function IrParaLogin() {
  window.location.href = "/Login";
}

function IrParaCadastro() {
  window.location.href = "/Cadastro";
}

const Recuperacao = () => {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [emailEnviado, setEmailEnviado] = useState(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://seu-backend-url.com/enviar-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmailEnviado(true);
        alert("Código de verificação enviado para seu e-mail!");
      } else {
        console.error("Erro ao enviar e-mail");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  const handleCodigoSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://seu-backend-url.com/verificar-codigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, codigo }),
      });

      if (response.ok) {
        alert("Código verificado com sucesso!");
        // Redirecionar para a página de redefinição de senha ou outra ação
      } else {
        console.error("Erro ao verificar código");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  return (
    <div className="tela-recuperacao">
      <div className="navbar">
        <div className="logo">
          <a href="/">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <div className="nav-buttons">
          <button onClick={IrParaLogin} className="botao-entrar">
            Entrar
          </button>
          <button onClick={IrParaCadastro} className="botao-cadastrar">
            <span className="gradient">Cadastrar</span>
          </button>
        </div>
      </div>
      <h1>Esqueceu sua Senha?</h1>
      <div className="div-recuperacao">
        <div className="div-email">
          <h2><span className="gradient">Email</span></h2>
          <form onSubmit={handleEmailSubmit}>
            <p>Qual seu e-mail cadastro?</p>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Enviar</button>
          </form>
        </div>
        {emailEnviado && (
          <div className="div-codigo-email">
            <h3><span className="gradient">Acabamos de enviar um código para seu e-mail.</span></h3>
            <p>Insira no campo abaixo o código de verificação de 4 dígitos enviado para seu e-mail.</p>
            <form onSubmit={handleCodigoSubmit}>
              <input
                type="text"
                name="codigo"
                placeholder="****"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
              <button type="submit">Enviar</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recuperacao;