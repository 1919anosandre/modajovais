import React, { useState } from "react";
import { Link } from "react-router-dom";
import '/src/styles/Header.css';
import imagem from '/src/assets/logositemoda-removebg-preview.png';
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";


export default function Header({ filtro, setFiltro }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const [busca, setBusca] = useState(""); // estado do input

  function togglemenu(){
        setMenuAberto(!menuAberto);

  }
  return (
    <header>
      <div className="top-header">
        <div className="logo-wrapper">
          <img src={imagem} alt="Logo-site" className="Logo-img" />
        </div>

        <div className="header-content">
   <div className="barra-pesquisa" style={{ position: "relative", width: "90%" }}>
  <input
    type="text"
    placeholder="O que você está buscando?"
    style={{
      width: "100%",          // para ficar responsivo
      borderRadius: "15px",
      paddingRight: "2.5rem", // espaço para o ícone
      height: "35px"          // opcional
    }}
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
  />

  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="black"
    className="bi bi-search"
    viewBox="0 0 16 16"
    style={{
      position: "absolute",
      right: "1rem",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none"
    }}
  >
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
  </svg>
</div>
<div className="icons-desktop">
  <Link to="/favoritos" className="icone-favoritos">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
      className="bi bi-heart-fill" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 
      4.736 3.562-3.248 8 1.314" />
    </svg>
  </Link>

  <Link to="/Login" className="icone-login">
    <FaUser color="white" size={28} />
  </Link>

  <Link to="/Carrinho" className="icone-carrinho">
    <FaShoppingBag color="white" size={28} />
    <span className="contador">0</span>
  </Link>
</div>

        </div>
          <div
           className={`menu-toggle ${menuAberto ? "ativar" : ""}`}
          onClick={togglemenu}
          style={{ cursor: "pointer" }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <nav className={`menu-categorias ${menuAberto ? "show" : ""}`}>
          {menuAberto && (
    <div className="icons-mobile">
      <Link to="/favoritos" className="icone-favoritos">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white"
          className="bi bi-heart-fill" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 
          4.736 3.562-3.248 8 1.314" />
        </svg>
      </Link>

      <Link to="/Login" className="icone-login">
        <FaUser color="white" size={28} style={{ marginLeft: "15px" }} />
      </Link>

      <Link to="/Carrinho" className="icone-carrinho">
        <FaShoppingBag color="white" size={28} style={{ marginLeft: "15px" }} />
        <span className="contador">0</span>
      </Link>
    </div>
  )}
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '10px' }}>
          <li>
            Camisetas
            <ul className="dropdown">
              <li onClick={() => setFiltro("moda-feminina-camisetas")}>Feminino</li>
              <li onClick={() => setFiltro("moda-masculina-camisetas")}>Masculino</li>
              <li onClick={() => setFiltro("")}>Todos</li>
            </ul>
          </li>

          <li>
            Shorts
            <ul className="dropdown">
              <li onClick={() => setFiltro("moda-feminina-shorts")}>Feminino</li>
              <li onClick={() => setFiltro("moda-masculina-shorts")}>Masculino</li>
              <li onClick={() => setFiltro("")}>Todos</li>
            </ul>
          </li>

          <li>
            Blusas
            <ul className="dropdown">
              <li onClick={() => setFiltro("moda-feminina-blusas")}>Feminino</li>
              <li onClick={() => setFiltro("moda-masculina-blusas")}>Masculino</li>
              <li onClick={() => setFiltro("")}>Todos</li>
            </ul>
          </li>

          <li>
            Moletons
            <ul className="dropdown">
              <li onClick={() => setFiltro("moda-feminina-moletons")}>Feminino</li>
              <li onClick={() => setFiltro("moda-masculina-moletons")}>Masculino</li>
              <li onClick={() => setFiltro("")}>Todos</li>
            </ul>
          </li>

          <li>
            Calças
            <ul className="dropdown">
              <li onClick={() => setFiltro("moda-feminina-calcas")}>Feminino</li>
              <li onClick={() => setFiltro("moda-masculina-calcas")}>Masculino</li>
              <li onClick={() => setFiltro("")}>Todos</li>
            </ul>
          </li>

          <li>Promoções
            <ul className="dropdown">

                          <li onClick={() => setFiltro("promocao-moda")}>Masculino</li>
            </ul>

          </li>
        </ul>
      </nav>
       

    </header>
  );
}

