import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

function CardFavoritos(){
  const [corSelecionadaIndex, setCorSelecionadaIndex] = useState(0);
  const [qntprodutos, setqntprodutos] = useState(0);
  const navigate = useNavigate();

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
        selo
      },
    });
  };

  const QuantidadeItensAdicionadosCarrinho =()=>{
    
const adicionarAoCarrinho = () => {
  setqntprodutos(prev => prev + 1); // forma segura de atualizar
};
  
  }

return(

<div className="Card">
 <div className="Card">
     {/* Imagem única conforme cor selecionada */}

           <div className="imagem-container">
        {selo && <span className="selo">{selo}</span>}

      <img
        src={Array.isArray(imagem) ? imagem[corSelecionadaIndex] : imagem}
        alt={`${nome} - ${cores[corSelecionadaIndex] || ""}`}
        onClick={irParaDetalhes}
        style={{ cursor: "pointer" }}
      />
            </div>


      <h4 onClick={irParaDetalhes} style={{ cursor: "pointer" }}>
        {nome}
      </h4>

      <CoresProduto
        cores={cores}
        corSelecionadaIndex={corSelecionadaIndex}
        onCorSelecionada={setCorSelecionadaIndex}
      />

      <select name="tamanho" id="tamanho">
        <option value="p">P</option>
        <option value="m">M</option>
        <option value="g">G</option>
        <option value="gg">GG</option>
      </select>

      <p>em 6x {parcelamento()}</p>
      <p>ou à vista R$ {preco}</p>
      <button onClick={adicionarAoCarrinho}>Comprar</button>
    </div>
  
</div>
)}
export default CardFavoritos