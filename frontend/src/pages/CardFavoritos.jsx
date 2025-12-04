// src/pages/Favoritos.jsx
import { useEffect, useState } from "react";
import "/src/styles/Carrinho.css"; // pode reaproveitar o CSS do carrinho
import "/src/styles/global.css";
import arrow from "/src/assets/arrow-left.svg";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  // Carrega os favoritos do localStorage
  useEffect(() => {
const favoritosLocal = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setFavoritos(favoritosLocal);
  }, []);

  const salvarFavoritos = (novoFavoritos) => {
    localStorage.setItem("favoritos", JSON.stringify(novoFavoritos));
    setFavoritos(novoFavoritos);
  };

  const removerFavorito = (id) => {
    const novoFavoritos = favoritos.filter((item) => item.id !== id);
    salvarFavoritos(novoFavoritos);
  };

  const adicionarAoCarrinho = (item) => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    const itemExistente = carrinho.find((p) => p.id === item.id);

    if (itemExistente) {
      const novoCarrinho = carrinho.map((p) =>
        p.id === item.id ? { ...p, quantidade: (p.quantidade || 1) + 1 } : p
      );
      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    } else {
      localStorage.setItem(
        "carrinho",
        JSON.stringify([...carrinho, { ...item, quantidade: 1 }])
      );
    }
    alert(`${item.nome} adicionado ao carrinho!`);
  };

  return (
    <div className="pagina-carrinho">
      <div className="alinhar-titulo-svg">
        <a href="http://localhost:5173/Home">
          <img src={arrow} alt="Voltar" className="icone-voltar" />
        </a>
        <h2>Seus Favoritos</h2>
      </div>

      {favoritos.length === 0 ? (
        <p>Nenhum item favoritado</p>
      ) : (
        <ul>
          {favoritos.map((item) => (
            <li className="item-carrinho" key={item.id}>
              <img src={item.imagem} alt={item.nome} />
              <div className="info-item">
                <strong>{item.nome}</strong>
                <p>{item.tamanho}</p>
                <p>R$ {item.preco.toFixed(2)}</p>
                <div className="quantidade-controle">
                  {/* Favoritos não precisa de quantidade */}
                </div>
                <button
                  className="botao-remover"
                  onClick={() => removerFavorito(item.id)}
                >
                  Remover
                </button>
                <button
                  className="comprarProduto"
                  onClick={() => adicionarAoCarrinho(item)}
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default Favoritos;
