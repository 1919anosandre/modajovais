import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Header from "/src/components/Header";
import Home from "../src/pages/Home";
import Card from "../src/pages/Card";
import Carrinho from "../src/pages/Carrinho";
import Detalhes from "../src/pages/Detalhes";
import Contato from "../src/pages/Contato";
import Login from "../src/pages/Login";
import Favoritos from "../src/pages/CardFavoritos";
import Compras from "../src/pages/Compras";
import BuscarProduto from "./components/buscar";

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [busca, setBusca] = useState("");

  // Carrega usuários do backend (exemplo)
 /* useEffect(() => {
    fetch('http://localhost:3001/usuarios')
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);
*/
  return (
    <div>
      <Router>
        {/* 🔝 Header sempre visível */}
        <Header 
          filtro={filtro} 
          setFiltro={setFiltro} 
          busca={busca} 
          setBusca={setBusca} 
        />

        <Routes>
          {/* 🏠 Página inicial */}
          <Route 
            path="/" 
            element={<Card filtro={filtro} busca={busca} />} 
          />

          {/* Outras rotas */}
          <Route path="/home" element={<Home />} />
          <Route path="/card" element={<Card filtro={filtro} busca={busca} />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/detalhes" element={<Detalhes />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/detalhes/carrinho" element={<Carrinho />} />
          <Route path="/comprar" element={<Compras />} />
          <Route path="/buscar" element={<BuscarProduto />} />
        </Routes>
      </Router>

      {/* 👥 Lista de usuários (exemplo de backend local) */}
      <div style={{ padding: "20px" }}>
        <h1>Usuários</h1>
        <ul>
          {usuarios.map((user) => (
            <li key={user.id}>
              {user.nome} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
