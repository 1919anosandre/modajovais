import { useEffect, useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

function SacolaIcone() {
  const [quantidade, setQuantidade] = useState(0);

  useEffect(() => {
    const atualizarQuantidade = () => {
      const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
      const total = carrinho.reduce((soma, item) => soma + (item.quantidade || 1), 0);
      setQuantidade(total);
    };

    atualizarQuantidade();

    // Ouve evento de atualização do carrinho
    const listener = () => atualizarQuantidade();
    window.addEventListener("atualizarCarrinho", listener);

    // Remove o ouvinte ao desmontar
    return () => window.removeEventListener("atualizarCarrinho", listener);
  }, []);

  return (
    <Link to="/carrinho" style={{ position: "relative", display: "inline-block" }}>
      <FaShoppingBag size={24} />
      {quantidade > 0 && (
        <span
          style={{
            position: "absolute",
            top: -8,
            right: -10,
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 6px",
            fontSize: "12px",
          }}
        >
          {quantidade}
        </span>
      )}
    </Link>
  );
}

export default SacolaIcone;
