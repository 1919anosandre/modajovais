import { createContext, useState } from "react";

export const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [contador, setContador] = useState(0);

  return (
    <CarrinhoContext.Provider value={{ contador, setContador }}>
      {children}
    </CarrinhoContext.Provider>
  );
}
