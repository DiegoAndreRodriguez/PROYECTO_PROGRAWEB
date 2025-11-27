import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  // CORRECCIÓN MAESTRA:
  // Si no encuentra 'image' (código viejo), usa 'image_url' (base de datos real)
  const imagenCorrecta = product.image || product.image_url;

  return (
    <article className="product-card">
      <img src={imagenCorrecta} alt={product.name} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">${product.price}</p>
        <div className="card-actions">
          <Link to={`/product/${product.id}`} className="btn">Ver detalle</Link>
          <button className="btn secondary" onClick={() => addItem(product, 1)}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}