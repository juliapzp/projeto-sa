import React, { useState, useEffect } from "react"; 
import "../css/Navbar.css";
import "../css/Perfil.css";
import logo from "../../assets/logo1.png";
import imgperfil from "../../assets/imgperfil.png";
import imgperfil2 from "../../assets/imgperfil2.png";
import { Link, useNavigate } from "react-router-dom";

function PerfilCliente() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Hook para redirecionamento

  useEffect(() => {
    // Função para buscar dados do perfil do servidor
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://seu-backend-url.com/perfil");
        if (response.ok) {
          const data = await response.json();
          setNome(data.nome);
          setCpf(data.cpf);
          setEmail(data.email);
        } else {
          console.error("Erro ao buscar dados do perfil");
        }
      } catch (error) {
        console.error("Erro de rede:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://seu-backend-url.com/atualizar-perfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf, email }),
      });

      if (response.ok) {
        alert("Dados atualizados com sucesso!");
      } else {
        console.error("Erro ao atualizar dados do perfil");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };


  return (
    <div className="tela-perfil">
      <div className="navbar">
        <div className="logo">
          <Link to="/ClienteLogado">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="perfil">
          <Link to="/">
            <button className="sair">Voltar</button>
          </Link>
        </div>
      </div>

      <div className="perfil2">
        <h1>
          <span className="gradient">Alterar Dados</span>
        </h1>
        <img src={imgperfil2} alt="perfil" />
      </div>
      <div className="dados">
        <form onSubmit={handleSubmit}>
          <p>Nome Completo</p>
          <input
            placeholder="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <p>CPF</p>
          <input
            placeholder="Insira seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <p>Email</p>
          <input
            placeholder="Insira seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <button type="submit" className="botao-enviar">Enviar</button>
        </form>
      </div>
    </div>
  );
}

export default PerfilCliente;
