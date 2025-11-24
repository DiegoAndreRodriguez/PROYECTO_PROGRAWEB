import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Hacemos las dos peticiones a la API en paralelo para más eficiencia
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/products`),
          fetch(`${API_BASE_URL}/api/categories`),
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error("No se pudieron cargar los datos del servidor.");
        }

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Mostramos un mensaje de carga o error si es necesario
  if (loading) return <div className="container">Cargando página principal...</div>;
  if (error) return <div className="container error-message">{error}</div>;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-inner container-row">
          <img
            src="/imagenes/banner_bueno.PNG"
            alt="banner"
            width={800}
            style={{ marginLeft: 50 }}
          />
        </div>
      </section>

      <section>
        <h2>Categorías destacadas</h2>
        <div className="categories-row">
          {categories.slice(0, 4).map((c) => (
            <Link
              to={`/search?category=${encodeURIComponent(c.name)}`}
              key={c.id}
              className="category-card"
            >
              <h3>{c.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>Más vendidos</h2>
        <div className="grid">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <h2>Productos nuevos</h2>
        <div className="grid">
          {products.slice(-8).reverse().map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
