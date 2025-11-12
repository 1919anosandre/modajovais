import React, { useState } from "react";
import Header from "/src/components/Header";
import Cards from "/src/pages/Card";

export default function PaginaModa() {
  const [filtro, setFiltro] = useState(""); // "" = todos

  return (
    <div>
  <Header filtro={filtro} setFiltro={setFiltro} />
      <Cards filtro={filtro} />         {/* Cards recebem filtro e mostram os produtos */}
    </div>
  );
}
