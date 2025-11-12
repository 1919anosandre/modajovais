import React, { useState } from "react";
import CoresProduto from "/src/components/CoresItens";
import { useNavigate } from "react-router-dom";

function CardProduto({ nome, preco, tamanho, parcelas, cores = [], imagem = [] , selo, precosemdesconto,video }) {
  const [corSelecionadaIndex, setCorSelecionadaIndex] = useState(0);

  const navigate = useNavigate();

  function adicionarAoCarrinho() {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

    const novoProduto = {
      id: Date.now(),
      nome,
      preco: parseFloat(preco),
      imagem: Array.isArray(imagem) ? imagem[corSelecionadaIndex] : imagem, // imagem única para carrinho
      tamanho,
      parcelas,
      cor: cores[corSelecionadaIndex],
    };

    const novoCarrinho = [...carrinhoAtual, novoProduto];
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));

    alert(`${nome} adicionado ao carrinho!`);
  }




  const parcelamento = () => {
    const parcelas = 6;
    const valorParcela = (parseFloat(preco) / parcelas).toFixed(2);
    const res = valorParcela.replace('.' , ',')
    return `R$ ${res} `;
  };

  const precoreplace = ()=>{
   return preco.toString().replace('.' , ',')
  
  }
  const irParaDetalhes = () => {
    navigate("/detalhes", {
      state: {
        nome,
        preco,
        imagens: Array.isArray(imagem) ? imagem : [imagem], // **passar sempre array no plural 'imagens'**
        tamanho,
        parcelas,
        cores,
        corSelecionadaIndex,
        selo,
        precosemdesconto,
        video
      },
    });
  };

    const [hover, setHover] = useState(false);

  return (
         <div className="Card">
      <div
        className="imagem-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ position: "relative", overflow: "hidden" }}
      >
        {selo && <span className="selo">{selo}</span>}

        {hover && video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              opacity: hover ? 1 : 0,
              transition: "opacity 0.4s ease-in-out",
              cursor: "pointer",
            }}
            onClick={irParaDetalhes}
          />
        ) : (
          <img
            src={Array.isArray(imagem) ? imagem[corSelecionadaIndex] : imagem}
            alt={`${nome} - ${cores[corSelecionadaIndex] || ""}`}
            onClick={irParaDetalhes}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              opacity: hover ? 0 : 1,
              transition: "opacity 0.4s ease-in-out",
              cursor: "pointer",
            }}
          />
        )}
      </div>

      <h4 onClick={irParaDetalhes} style={{ cursor: "pointer" }}>
        {nome}
      </h4>

      <CoresProduto
        cores={cores}
        corSelecionadaIndex={corSelecionadaIndex}
        onCorSelecionada={setCorSelecionadaIndex}
      />

      {precosemdesconto && (
        <p>
          <span className="precosemdesconto" style={{ fontSize: "0.9rem" }}>
            <s>R${precosemdesconto}</s>
          </span>
        </p>
      )}

      <p>
        R$ <span className="precotamanho">{precoreplace()}</span>
      </p>

      <p>
        6x <span className="parcelamentotamanho">{parcelamento()}</span> sem juros
      </p>
    </div>
  );
}

export default CardProduto;
