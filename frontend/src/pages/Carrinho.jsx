// src/pages/Carrinho.jsx
import { useEffect, useState } from "react";
import "/src/styles/Carrinho.css";
import "/src/styles/global.css";
import arrow from "/src/assets/arrow-left.svg"
import Footer from "/src/components/Footer";



function Carrinho() {
  const [carrinho, setCarrinho] = useState([]);
    const [contador, setContador] = useState(0);
  const [mostrarInputCep, setMostrarInputCep] = useState(false);
  const [cep, setCep] = useState(""); // para armazenar o valor do CEP digitado

 function carrinhoContador({ contador, setContador }) {
  return (
    <div>
      <h1>Você tem {contador} itens no carrinho</h1>
      <button onClick={() => setContador(contador + 1)}>Adicionar item</button>
    </div>
  );
}


  useEffect(() => {
    const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho")) || [];
    setCarrinho(carrinhoLocal);
  }, []);

  const salvarCarrinho = (novoCarrinho) => {
localStorage.setItem("carrinho" , JSON.stringify(novoCarrinho))
setCarrinho(novoCarrinho)
  };

  const aumentarQuantidade = (id) => {
    const novoCarrinho = carrinho.map((item) =>
      item.id === id ? { ...item, quantidade: (item.quantidade || 1) + 1 } : item
    );
    salvarCarrinho(novoCarrinho);
  };

  const diminuirQuantidade = (id) => {
    const novoCarrinho = carrinho
      .map((item) =>
        item.id === id
          ? { ...item, quantidade: (item.quantidade || 1) - 1 }
          : item
      )
      .filter((item) => item.quantidade > 0);
    salvarCarrinho(novoCarrinho);
  };

  const removerItem = (id) => {
    const novoCarrinho = carrinho.filter((item) => item.id !== id);
    salvarCarrinho(novoCarrinho);
  };

  const limparCarrinho = () => {
    localStorage.removeItem("carrinho");
    setCarrinho([]);
  };

  const totalCarrinho = carrinho.reduce(
    (total, item) => total + (item.preco * (item.quantidade || 1)),
    0
  );

const handleComprar = (produtoId) => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const produtoSelecionado = carrinho.find(p => p.id === produtoId);
  if (!produtoSelecionado || !usuario) return alert("Erro ao comprar");

  const dadosCompra = {
    usuario_id: usuario.id,
    nome_produto: produtoSelecionado.nome,
    preco: produtoSelecionado.preco,
    cor: produtoSelecionado.cor,
    tamanho: produtoSelecionado.tamanho,
    quantidade: 1 // ou produtoSelecionado.quantidade se você tiver
  };

 fetch("http://localhost:3001/comprar", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(dadosCompra)
})
  .then(res => {
    if (!res.ok) {
      throw new Error(`Erro ao comprar (status ${res.status})`);
    }
    return res.json();
  })
  .then(data => {
    alert("Compra realizada com sucesso!");
    const novoCarrinho = carrinho.filter(p => p.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    window.location.reload();
  })
  .catch(err => {
    console.error("Erro ao comprar:", err);
    alert("Erro ao comprar!");
  });
}

  return (
    <div className="pagina-carrinho">
      <div className="alinhar-titulo-svg">
       <a href="http://localhost:5173/Home" ><img src={arrow} alt="Voltar" className="icone-voltar" /></a>
        <h2>Seu Carrinho</h2>
      </div>
      {carrinho.length === 0 ? (
        <p>Carrinho vazio</p>


      ) : (
        <>
          <ul>
            {carrinho.map((item) => (
              <li className="item-carrinho" key={item.id}>
                <img src={item.imagem} alt={item.nome} />
                <div className="info-item">
                  <strong>{item.nome}</strong>
                  <p>{item.tamanho}</p>
                  <p>R$ {item.preco.toFixed(2)}</p>
                  <div className="quantidade-controle">
                    <button onClick={() => diminuirQuantidade(item.id)}>-</button>
                    <span>{item.quantidade || 1}</span>
                    <button onClick={() => aumentarQuantidade(item.id)}>+</button>
                  </div>
                  <button
                    className="botao-remover"
                    onClick={() => removerItem(item.id)}
                  >
                    Remover
                  </button>
                        <button className="comprarProduto" onClick={() => handleComprar(item.id)}>Comprar</button>

                </div>
              </li>
            ))}
          </ul>

          <div className="total-carrinho">
            <h3>Total: R$ {totalCarrinho.toFixed(2)}</h3>
            <button onClick={limparCarrinho}>Limpar Carrinho</button>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default Carrinho;
