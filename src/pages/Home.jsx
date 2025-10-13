import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Home({ productList }) {
  const activeProducts = productList.filter((p) => p.active);

  const topProducts = [...activeProducts]
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 12);
  const newProducts = [...activeProducts]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 6);
  const featuredCategories = categories.slice(0, 3);

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
          {featuredCategories.map((c) => (
            <Link
              to={`/search?category=${c}`}
              key={c}
              className="category-card"
            >
              <h3>{c}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>Más vendidos</h2>
        <div className="grid">
          {topProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section>
        <h2>Productos nuevos</h2>
        <div className="grid">
          {newProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
