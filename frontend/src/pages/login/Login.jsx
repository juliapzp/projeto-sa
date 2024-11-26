import React from 'react';
import '../css/Navbar.css';
import '../css/LoginCadastro.css';
import logo from '../../assets/logo1.png';
import profile from '../../assets/profile.png';
import { Link } from 'react-router-dom';

function IrParaLogin() {
  window.location.href = '/Login';
}

function IrParaCadastro() {
  window.location.href = '/Cadastro';
}

function IrParaLoginCliente() {
  window.location.href = '/LoginCliente';
}

function IrParaLoginAdmin() {
  window.location.href = '/LoginAdmin';
}

const Login = () => {
  return (
    <div className="tela-logincadastro">
      <div className="navbar">
        <div className="logo">
        <a href="/">
        <img  src={logo} alt="logo" />
        </a>
        </div>
        <div className="nav-buttons">
          <button onClick={IrParaLogin} className="botao-entrar">Entrar</button>
          <button onClick={IrParaCadastro} className="botao-cadastrar"><span className='gradient'>Cadastrar</span></button>
        </div>
      </div>
      <div className='escolha-logincadastro'>
        <h1 className='gradient'>Escolha seu Perfil:</h1>
        <div className='divs-escolha'>
          <div className='cliente'>
            <img className='profile' src={profile} alt="Profile" />
            <h1 className='gradient'>Cliente</h1>
            <button onClick={IrParaLoginCliente} className="botao-escolha">Entrar</button>
          </div>

          <div className='administrador'>
            <img className='profile' src={profile} alt="Profile" />
            <h1 className='gradient'>Administrador</h1>
            <button onClick={IrParaLoginAdmin} className="botao-escolha">Entrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;