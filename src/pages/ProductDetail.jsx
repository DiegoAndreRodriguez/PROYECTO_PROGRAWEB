import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { addItem } = useCart();
  const { id } = useParams();

  // Estados locales para manejar la data del API
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Usa la variable de entorno o localhost por defecto
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        
        const response = await fetch(`${apiUrl}/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Renderizado condicional: Cargando
  if (loading) {
    return (
      <div className="container" style={{ padding: "50px", textAlign: "center" }}>
        <h2>Cargando detalles... 🔮</h2>
      </div>
    );
  }

  // Renderizado condicional: Error o no encontrado
  if (error || !product) {
    return (
      <div className="container error-container" style={{ padding: "50px", textAlign: "center" }}>
        <h2>Producto no encontrado 😕</h2>
        <p>Parece que este superpoder no existe o fue desactivado.</p>
        <Link to="/search" className="btn" style={{ marginTop: "20px", display: "inline-block" }}>
          Volver al catálogo
        </Link>
      </div>
    );
  }
  
  return (
    <div className="product-detail">
      <div className="detail-grid container-row">
        <div className="detail-image">
          <img 
            src={product.image || product.image_url} 
            alt={product.name} 
          />
        </div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="category">Categoría: {product.category}</p>
          <p className="price">Precio: ${product.price}</p>
          <p>{product.description}</p>

          <div className="detail-actions">
            <button onClick={() => addItem(product, 1)}>
              Agregar al carrito
            </button>
            <Link to="/search" className="btn-link">
              Seguir explorando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}