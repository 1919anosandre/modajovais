import React, { useState, useEffect } from "react";
import { useLocation, Navigate } from "react-router-dom";
import "/src/styles/global.css";
import "/src/styles/Detalhes.css";
import Header from "/src/components/Header";
import { CiHeart } from "react-icons/ci";

  
function Detalhes() {
  const { state } = useLocation();
    const [isClicked, setIsClicked] = useState(false);

      const handleClick = () => {
    setIsClicked(!isClicked); // alterna entre clicado e não clicado
  };

  if (!state) return <Navigate to="/" replace />;

  const {
    nome,
    preco,
    imagens = [],
    cores = [],
    tamanho,
    parcelas
  } = state;

  const [quantidade, setQuantidade] = useState(1);
  const [precoTotal, setPrecoTotal] = useState(parseFloat(preco));
  const [imagemAtualIndex, setImagemAtualIndex] = useState(
    state.corSelecionadaIndex || 0
  );
  const [corSelecionada, setCorSelecionada] = useState(
    cores[imagemAtualIndex] || ""
  );
  const [mostrarInputCep, setMostrarInputCep] = useState(false);

  // Estado para comentários
  const [comentarios, setComentarios] = useState([]);
  const [texto, setTexto] = useState("");
  const [cep, setCep] = useState("");

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
      id: Date.now(),
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

  const parcelamento = () => {
    const valorParcela = (parseFloat(preco) / 6).toFixed(2);
    return `R$ ${valorParcela.replace(".", ",")} sem juros`;
  };

        useEffect(() =>{
  const armazenarComentarios = JSON.parse(localStorage.getItem('texto')) || [];
setComentarios(armazenarComentarios)
    } , [])


  const enviarComentario = () => {
  if (texto.trim() === "") return;

  const novoArray = [...comentarios, texto]; // adiciona comentário
  setComentarios(novoArray);                 // atualiza state
  localStorage.setItem('texto', JSON.stringify(novoArray)); // salva no localStorage
  setTexto("");                               // limpa textarea
};

    
  return (
    <>
      <Header />
      <div className="container">
        <div className="detalhes-flex">
          <img
            src={imagens[imagemAtualIndex]}
            alt={`${nome} - ${corSelecionada}`}
            className="imagem-grande"
          />
          <div className="alinharcolumn">
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width:"100%"}}>

            <h2 style={{textAlign:"center"}}>{nome}</h2>
        <CiHeart
      onClick={handleClick}
      style={{
        marginLeft: "5rem",
        width: "32px",
        height: "32px",
        fill: isClicked ? "black" : "currentColor", // muda a cor ao clicar
        cursor: "pointer",
        transition: "fill 0.3s ease", // animação suave
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
            <p>
              ou à vista R$ {precoTotal.toFixed(2).replace(".", ",")}
            </p>

            <div className="cores-lista" style={{ marginTop: 20 }}>
              {cores.map((cor, idx) => (
                <div
                  key={idx}
                  className={`cor-item ${
                    corSelecionada === cor ? "selecionada" : ""
                  }`}
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
              <button
                className="addcarrinho"
                onClick={adicionarAoCarrinho}
              >
                Adicionar ao Carrinho
              </button>
              
            </div>
          </div>
        </div>
      </div>

      <div className="especificacoesProdutos">
        <p>Descrição:
          <br></br>
Camiseta de modelagem oversized, confortável e estilosa, ideal para o dia a dia. Tecido 100% algodão, toque macio e respirável. Gola reforçada e costura dupla nas mangas para maior durabilidade.
          <br></br><br></br>

Especificações técnicas:
          <br></br><br></br>

Material: 100% algodão
          <br></br>

Modelagem: Oversized (mais larga e comprida)
          <br></br>

Gola: Careca (redonda)
          <br></br>

Cores disponíveis: Preto, branco, cinza
          <br></br>

Medidas aproximadas (cm):
          <br></br>

Tamanho	Largura	Altura	Manga
P	54	72	22
M	57	75	23
G	60	78	24
GG	63	81	25</p>
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
