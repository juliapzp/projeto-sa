import React, { useState, useEffect } from "react";
import "../css/Home.css";
import logo from "../../assets/logo1.png";
import img1 from "../../assets/img1.png";
import imgperfil from "../../assets/imgperfil.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faFaceSadTear,
  faCircleArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState(null); // Para identificar o tipo de usuário: cliente ou admin
  const [showForm, setShowForm] = useState(false); // Estado para controlar a exibição do formulário
  const [nome, setNome] = useState(""); // Estado para o campo de nome
  const [setor, setSetor] = useState(""); // Estado para o setor
  const [duvida, setDuvida] = useState(""); // Estado para a dúvida
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    if (user) {
      setUserType("cliente"); // Usuário é cliente
    } else if (admin) {
      setUserType("admin"); // Usuário é admin
    } else {
      setUserType(null); // Nenhum usuário logado
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      localStorage.removeItem("admin");
      setUserType(null);
      navigate("/");
    }
  };

  const handleButtonClick = () => {
    setShowForm(!showForm); // Alterna a exibição do formulário
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página
    alert(`Dúvida enviada por ${nome} no setor ${setor}: ${duvida}`);
    // Limpar os campos após envio
    setNome("");
    setSetor("");
    setDuvida("");
    setShowForm(false); // Oculta o formulário após o envio
  };

  return (
    <div className="tela-home">
      {userType === "cliente" ? ( // Exibindo conteúdo para cliente logado
        <div className="tela-home">
          <div className="navbar">
            <div className="logo">
              <Link to="/ClienteLogado">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="perfil">
              <Link to="/PerfilCliente">
                <img src={imgperfil} alt="perfil" />
              </Link>
              <button className="sair" onClick={handleLogout}>
                <h2>Sair</h2>
              </button>
            </div>
          </div>

          <div className="bem-vindo">
            <h1>Bem-vindo(a) ao Suporte da ACSIV</h1>
            <img src={img1} alt="Img1" />
          </div>
          <div className="abaixo">
            <div className="botoes-duvidas">
              <button className="botao-duvida" onClick={handleButtonClick}>
                <span className="gradient">Tire sua dúvida</span>
              </button>
              {showForm && (
                <div className="form-duvida">
                  <br /><br /><br />
                  <form onSubmit={handleSubmit}>
                    <div>
                      <label className="titulinho">Assunto:</label>
                      <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                      />
                    </div>
                    <br />
                    <div>
                      <label>Setor da Reclamação:</label>
                      <select
                        value={setor}
                        onChange={(e) => setSetor(e.target.value)}
                        required
                      >
                        <option value="">Selecione o Setor</option>
                        <option value="setor1">Setor 1</option>
                        <option value="setor2">Setor 2</option>
                        <option value="setor3">Setor 3</option>
                      </select>
                    </div>
                    <br />
                    <div>
                      <label className="titulinho">Dúvida:</label>
                      <textarea
                        value={duvida}
                        onChange={(e) => setDuvida(e.target.value)}
                        required
                      ></textarea>
                      <br /><br /><br />
                    </div>
                
                    <button type="submit">Enviar Dúvida</button>
                  </form>
                </div>
              )}
<br /><br />
              <button className="botao-duvida">
                <span className="gradient">Suas dúvidas</span>
              </button>

              <div className="duvidas">
                <div className="duvida">
                  <h2 className="gradient">Exemplo</h2>
                  <p>
                    Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo
                    Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo
                    Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo
                  </p>
                  <div className="status">
                    <div className="status-respondido">
                      <FontAwesomeIcon
                        icon={faFaceSmile}
                        className="feliz"
                      />
                      <h3>Respondido</h3>
                    </div>
                    <div className="mostrar-resposta">
                      <h4>Ver Resposta</h4>
                      <FontAwesomeIcon
                        icon={faCircleArrowDown}
                        className="seta-baixo"
                      />
                    </div>
                  </div>
                </div>

                <div className="duvida">
                  <h2 className="gradient">Exemplo</h2>
                  <p>
                    Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo
                    Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo
                    Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo
                  </p>
                  <div className="status">
                    <div className="status-nao-respondido">
                      <FontAwesomeIcon
                        icon={faFaceSadTear}
                        className="triste"
                      />
                      <h3>Não Respondido</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : userType === 'admin' ? (
        // Exibindo conteúdo para admin logado
        <div className="tela-home">
          <div className="navbar">
            <div className="logo">
              <Link to="/AdminLogado">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="perfil">
              <button className="sair" onClick={handleLogout}> {/* Modificado para usar onClick */}
                <h2>Sair</h2>
              </button>
            </div>
          </div>

          <div className="bem-vindo">
            <h1>Bem-vindo(a) ao Suporte da ACSIV</h1>
            <img src={img1} alt="Img1" />
          </div>
          <div className="abaixo">
            <div className="botoes-duvidas">
              <button className="botao-duvida" >
                <span className="gradient">Suas Respostas</span>
              </button>
            </div>
            <h1 className="gradient">DÚVIDAS</h1>
            <div className="div-filtro-barra">
              <div className="div-filtros">
                {/* Filtros */}
              </div>
              <div className="div-barra">
                <span className="search-container">
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Pesquisar..."
                  />
                  <FontAwesomeIcon icon={faSearch} className="search-icon" />
                </span>
              </div>
            </div>
          </div>
          
        </div>
      ) : (
        // Exibindo conteúdo para usuário não logado
        <div className="tela-home">
          <div className="navbar">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
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
          <div className="bem-vindo">
            <h1>Bem-vindo(a) ao Suporte da ACSIV</h1>
            <img src={img1} alt="Img1" />
          </div>
          <div className="abaixo">
            <div className="botoes-duvidas">
              <Link to="/Login">
                <button className="botao-duvida">
                  <span className="gradient">Tire sua dúvida</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
