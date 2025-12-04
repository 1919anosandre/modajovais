import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import "/src/styles/global.css";
import "/src/styles/Detalhes.css";
import Header from "/src/components/Header";
import { CiHeart } from "react-icons/ci";
import arrow from "/src/assets/arrow-left.svg";

function Detalhes() {
  const { state } = useLocation();
  const [isFavorito, setIsFavorito] = useState(false); // mudou de isClicked para isFavorito
  const [quantidade, setQuantidade] = useState(1);
  const [precoTotal, setPrecoTotal] = useState(parseFloat(state?.preco || 0));
  const [imagemAtualIndex, setImagemAtualIndex] = useState(state?.corSelecionadaIndex || 0);
  const [corSelecionada, setCorSelecionada] = useState(state?.cores?.[imagemAtualIndex] || "");
  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState("");

  if (!state) return <Navigate to="/" replace />;

  const { nome, preco, imagens = [], cores = [], tamanho, parcelas } = state;

  // Verifica se o produto já está nos favoritos
// Verifica se o produto já está nos favoritos
// Verifica se o produto já está nos favoritos

const getFavoritos = () => {
  try {
    const data = localStorage.getItem("favoritos");
    if (!data) return [];
    const parsed = JSON.parse(data);

    // garante que sempre retorna array
    return Array.isArray(parsed) ? parsed : [];

  } catch {
    // Se estiver corrompido, reseta
    localStorage.setItem("favoritos", "[]");
    return [];
  }
};

// Verifica se está favoritado
useEffect(() => {
  if (!state?.id) return;

  const favoritosLocal = getFavoritos();
  const existe = favoritosLocal.some(item => item.id === state.id);
  setIsFavorito(existe);
}, [state]);


// Adicionar ou remover dos favoritos
const handleFavoritoClick = () => {
  try {
    const favoritosLocal = getFavoritos();

    if (isFavorito) {
      // remove
      const novos = favoritosLocal.filter(item => item.id !== state.id);
      localStorage.setItem("favoritos", JSON.stringify(novos));
      setIsFavorito(false);
      return;
    }

    // adiciona
    const novoProduto = {
      id: state.id,
      nome,
      preco: parseFloat(preco),
      imagem: imagens[imagemAtualIndex],
      tamanho,
      cor: cores[imagemAtualIndex],
    };

    const novos = [...favoritosLocal, novoProduto];
    localStorage.setItem("favoritos", JSON.stringify(novos));
    setIsFavorito(true);

  } catch (e) {
    console.error("Erro ao salvar favoritos:", e);
  }
};



  const handleCorClick = (idx) => {
    setImagemAtualIndex(idx);
    setCorSelecionada(cores[idx]);
  };

  const aumentarQuantidade = () => {
    const novaQuantidade = quantidade + 1;
    setQuantidade(novaQuantidade);
    setPrecoTotal(parseFloat(preco) * novaQuantidade);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      const novaQuantidade = quantidade - 1;
      setQuantidade(novaQuantidade);
      setPrecoTotal(parseFloat(preco) * novaQuantidade);
    }
  };

  const adicionarAoCarrinho = () => {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];
    const novoProduto = {
      id: state.id,
      nome,
      preco: parseFloat(preco),
      imagem: imagens[imagemAtualIndex],
      tamanho,
      parcelas,
      cor: cores[imagemAtualIndex],
      quantidade
    };
    localStorage.setItem(
      "carrinho",
      JSON.stringify([...carrinhoAtual, novoProduto])
    );
    alert(`${nome} adicionado ao carrinho!`);
  };

  // Comentários
  useEffect(() => {
    const armazenarComentarios = JSON.parse(localStorage.getItem('texto')) || [];
    setComentarios(armazenarComentarios);
  }, []);

  const enviarComentario = () => {
    if (texto.trim() === "") return;
    const novoArray = [...comentarios, texto];
    setComentarios(novoArray);
    localStorage.setItem('texto', JSON.stringify(novoArray));
    setTexto("");
  };

  const parcelamento = () => {
    const valorParcela = (parseFloat(preco) / 6).toFixed(2);
    return `R$ ${valorParcela.replace(".", ",")} sem juros`;
  };

  return (
    <>
      <Header /> {/* Header agora fica ciente do localStorage */}

      <div className="container">
        <div className="detalhes-flex">
          <a href="/Home">
            <img src={arrow} alt="Voltar" className="icone-voltar" />
          </a>

          <img
            src={imagens[imagemAtualIndex]}
            alt={`${nome} - ${corSelecionada}`}
            className="imagem-grande"
          />

          <div className="alinharcolumn">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width:"100%"}}>
              <h2>{nome}</h2>
              <CiHeart
                onClick={handleFavoritoClick}
                style={{
                  width: "32px",
                  height: "32px",
                  fill: isFavorito ? "red" : "currentColor",
                  cursor: "pointer",
                  transition: "fill 0.3s ease",
                }}
              />
            </div>

            <select name="tamanho" id="tamanho" defaultValue={tamanho}>
              <option value="p">P</option>
              <option value="m">M</option>
              <option value="g">G</option>
              <option value="gg">GG</option>
            </select>

            <p>em 6x {parcelamento()}</p>
            <p>ou à vista R$ {precoTotal.toFixed(2).replace(".", ",")}</p>

            <div className="cores-lista" style={{ marginTop: 20 }}>
              {cores.map((cor, idx) => (
                <div
                  key={idx}
                  className={`cor-item ${corSelecionada === cor ? "selecionada" : ""}`}
                  style={{ backgroundColor: cor, cursor: "pointer" }}
                  onClick={() => handleCorClick(idx)}
                  title={cor}
                />
              ))}
            </div>

            <div className="quantidade-controle">
              <button onClick={diminuirQuantidade}>-</button>
              <span>{quantidade}</span>
              <button onClick={aumentarQuantidade}>+</button>
            </div>

            <div className="centralizarbuttons">
              <button className="addcarrinho" onClick={adicionarAoCarrinho}>
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Avaliações */}
      <div className="containerAvaliacoes">
        <select className="avaliacaoEstrelas">
          <option value="5">★★★★★</option>
          <option value="4">★★★★☆</option>
          <option value="3">★★★☆☆</option>
          <option value="2">★★☆☆☆</option>
          <option value="1">★☆☆☆☆</option>
        </select>

        <h3>Deixe sua avaliação</h3>
        <div className="avaliacoes">
          <textarea
            id="avaliacaoComentarios"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
          ></textarea>
          <button className="enviarAvaliacao" onClick={enviarComentario}>
            Enviar
          </button>
        </div>
      </div>

      {/* Lista de comentários */}
      <div className="comentariosContainer">
        {comentarios.map((comentario, index) => (
          <div key={index} className="comentario">
            <h4 className="titulo">Usuário {index + 1}</h4>
            <p>{comentario}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Detalhes;
