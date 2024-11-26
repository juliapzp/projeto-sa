  import React, { useState } from 'react';
  import '../css/Home.css';
  import logo from '../../assets/logo1.png';
  import img1 from '../../assets/img1.png';
  import imgperfil from '../../assets/imgperfil.png';
  import { Link } from 'react-router-dom';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faSearch, faFaceSmile, faFaceSadTear, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';

  function HomeClienteLogado() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [nome, setNome] = useState('');
    const [setor, setSetor] = useState('');
    const [duvida, setDuvida] = useState('');

    const handleButtonClick = () => {
      setShowForm(!showForm); 
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Nome: ${nome}\nSetor: ${setor}\nDúvida: ${duvida}`);
    };

    return (
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
            <button className="botao-duvida" onClick={handleButtonClick}>
              <span className="gradient">Tire sua dúvida</span>
            </button>
            {showForm && (
              <div className="form-duvida">
                <form onSubmit={handleSubmit}>
                  <div>
                    <label className='titulinho'>Nome:</label>
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
                    <label className='titulinho'>Dúvida:</label>
                    <textarea
                      value={duvida}
                      onChange={(e) => setDuvida(e.target.value)}
                      required
                    ></textarea>
                  </div>

                  <button type="submit">Enviar Dúvida</button>
                </form>
              </div>
            )}

            <button className="botao-duvida">
              <span className="gradient">Suas dúvidas</span>
            </button>
          </div>

          <h1 className="gradient">DÚVIDAS</h1>
          <div className="div-filtro-barra">
            <div className="div-filtros">
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Área
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Área 1</a>
                  <a className="dropdown-item" href="#">Área 2</a>
                  <a className="dropdown-item" href="#">Área 3</a>
                </div>
              </div>

              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Status
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Respondido</a>
                  <a className="dropdown-item" href="#">Não Respondido</a>
                </div>
              </div>

              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Data
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Mais Recente</a>
                  <a className="dropdown-item" href="#">Mais Antigo</a>
                </div>
              </div>
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

          <div className="duvidas">
            <div className="duvida">
              <h2 className="gradient">Exemplo</h2>
              <p>Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo</p>
              <div className="status">
                <div className="status-respondido">
                  <FontAwesomeIcon icon={faFaceSmile} className="feliz" />
                  <h3>Respondido</h3>
                </div>
                <div className="mostrar-resposta">
                  <h4>Ver Resposta</h4>
                  <FontAwesomeIcon icon={faCircleArrowDown} className="seta-baixo" />
                </div>
              </div>
            </div>

            <div className="duvida">
              <h2 className="gradient">Exemplo</h2>
              <p>Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo Exemplo</p>
              <div className="status">
                <div className="status-nao-respondido">
                  <FontAwesomeIcon icon={faFaceSadTear} className="triste" />
                  <h3>Não Respondido</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default HomeClienteLogado;
