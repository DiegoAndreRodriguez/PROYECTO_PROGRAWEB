import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { addItem } = useCart();
  const { id } = useParams();
  const product = products.find(p => String(p.id) === String(id));

  if (!product) {
    return (
      <div>
        <h2>Producto no encontrado</h2>
        <Link to="/">Volver a inicio</Link>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="detail-grid container-row">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="category">Categoría: {product.category}</p>
          <p className="price">Precio: ${product.price}</p>
          <p>{product.description}</p>

          <div className="detail-actions">
            <button onClick={() => addItem(product,1)}>Agregar al carrito</button>
            <Link to="/search" className="btn-link">Seguir explorando</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
