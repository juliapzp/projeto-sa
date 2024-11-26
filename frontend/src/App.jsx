import React from 'react';
import Home from './pages/home/Home.jsx';
import HomeClienteLogado from './pages/home/HomeClienteLogado.jsx';
import HomeAdminLogado from './pages/home/HomeAdminLogado.jsx';
import Login from './pages/login/Login.jsx';
import Cadastro from './pages/cadastro/CadastroCliente.jsx';
import LoginCliente from './pages/login/LoginCliente.jsx';
import LoginAdmin from './pages/login/LoginAdmin.jsx';
import Recuperacao from './pages/recuperacao/Recuperacao.jsx';
import PerfilCliente from './pages/perfil/PerfilCliente.jsx';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ClienteLogado" element={<HomeClienteLogado />} />
        <Route path="/AdminLogado" element={<HomeAdminLogado />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Cadastro" element={<Cadastro />} />
        <Route path="/LoginCliente" element={<LoginCliente />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/Recuperacao" element={<Recuperacao />} />
        <Route path="/PerfilCliente" element={<PerfilCliente />} /> 
      </Routes>
    </Router>
  );
}

export default App;