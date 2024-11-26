import React, { useState, useEffect } from "react";
import "../css/Home.css";
import logo from "../../assets/logo1.png";
import img1 from "../../assets/img1.png";
import imgperfil from "../../assets/imgperfil.png";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userType, setUserType] = useState(null);  // Para identificar o tipo de usuário: cliente ou admin
  const navigate = useNavigate();

  useEffect(() => {
    // Verificando no localStorage se o usuário está logado
    const user = localStorage.getItem('user');
    const admin = localStorage.getItem('admin');
    if (user) {
      setUserType('cliente');  // Usuário é cliente
    } else if (admin) {
      setUserType('admin');  // Usuário é admin
    }
  }, []);

  const handleButtonClick = () => {
    navigate("/Cadastro");
  };

  return (
    <div className="tela-home">
      {userType === 'cliente' ? (
        // Exibindo conteúdo para cliente logado
        <div className="tela-home">
          <div className="navbar">
            <div className="logo">
              <Link to="/ClienteLogado">
                <img src={logo} alt="logo" />
              </Link>
            </div>
            <div className="perfil">
              <Link to="/Perfil">
                <img src={imgperfil} alt="perfil" />
              </Link>
            </div>
          </div>

          <div className="bem-vindo">
            <h1>Bem-vindo(a) ao Suporte da ACSIV</h1>
            <img src={img1} alt="Img1" />
          </div>
          <div className="abaixo">
            <div className="botoes-duvidas">
              <button className="botao-duvida" >
                <span className="gradient">Tire sua dúvida</span> 
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
              <Link to="/AdminPerfil">
                <img src={imgperfil} alt="perfil" />
              </Link>
            </div>
          </div>

          <div className="bem-vindo">
            <h1>Bem-vindo(a) ao Painel Administrativo</h1>
            <img src={img1} alt="Img1" />
          </div>
          {/* Conteúdo específico para admins */}
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
      )}
    </div>
  );
}

export default Home;
