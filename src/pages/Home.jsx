import React from "react";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const topProducts = [...products].sort((a,b) => b.sold - a.sold).slice(0,12);
  const newProducts = [...products].sort((a,b) => b.createdAt - a.createdAt).slice(0,6);
  const featuredCategories = categories.slice(0,3);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-inner container-row">
          <div>
            <h1>Tienda de Superpoderes ⚡</h1>
            <p>Explora habilidades únicas y lleva tu potencial al máximo.</p>
          </div>
          <img src="https://via.placeholder.com/400x200?text=Banner+Publicitario" alt="banner" />
        </div>
      </section>

      <section>
        <h2>Categorías destacadas</h2>
        <div className="categories-row">
          {featuredCategories.map((c) => (
            <div key={c} className="category-card">
              <h3>{c}</h3>
              <p>Explora poderes de {c.toLowerCase()}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Más vendidos</h2>
        <div className="grid">
          {topProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section>
        <h2>Productos nuevos</h2>
        <div className="grid">
          {newProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}
