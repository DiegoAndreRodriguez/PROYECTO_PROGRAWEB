import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="category">{product.category}</p>
        <p className="price">${product.price}</p>
        <div className="card-actions">
          <Link to={`/product/${product.id}`} className="btn">Ver detalle</Link>
          <button className="btn secondary" onClick={() => alert("Agregar al carrito (pendiente: Alumno 2)")} >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
