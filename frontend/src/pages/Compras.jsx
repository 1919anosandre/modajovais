import { useEffect, useState } from 'react';
import CompraItem from '../components/CompraItem';

export default function ComprasPage() {
  const [compras, setCompras] = useState([]);

useEffect(() => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuario || !usuario.id) {
    console.warn("Usuário não logado ou ID inválido.");
    return;
  }

  fetch(`http://localhost:3001/compras/${usuario.id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
      }
      return res.json();
    })
    .then(data => setCompras(data))
    .catch(err => console.error("Erro ao buscar compras:", err));
}, []);

  return (
    <div className="compras-container">
      <h2>Minhas Compras</h2>
      {compras.length === 0 ? (
        <p>Você ainda não comprou nada 😢</p>
      ) : (
        compras.map((c) => <CompraItem key={c.id} compra={c} />)
      )}
    </div>
  );
}
