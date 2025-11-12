import { useState } from "react";
import Card from "/src/pages/Card";

export default function BuscarProduto() {
  const [busca, setBusca] = useState("");

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Buscar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* Passa o filtro para o Card.jsx */}
      <Card filtro={busca} />
    </div>
  );
}
