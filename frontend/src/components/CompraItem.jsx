// components/CompraItem.jsx
export default function CompraItem({ compra }) {
  return (
    <div className="compra-item">
      <h4>{compra.nome_produto}</h4>
      <p>Quantidade: {compra.quantidade}</p>
      <p>Cor: {compra.cor}</p>
      <p>Tamanho: {compra.tamanho}</p>
      <p>Data: {new Date(compra.data_compra).toLocaleDateString()}</p>
      <p>Total: R$ {(compra.preco * compra.quantidade).toFixed(2).replace('.', ',')}</p>
    </div>
  );
}
