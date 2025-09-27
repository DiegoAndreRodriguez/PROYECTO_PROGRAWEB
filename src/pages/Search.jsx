import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Search() {
  const query = useQuery();
  const navigate = useNavigate();
  const q = (query.get("q") || "").toLowerCase();
  const cat = query.get("category") || "";
  const sort = query.get("sort") || "relevance";
  const page = Math.max(1, parseInt(query.get("page") || "1", 10));
  const pageSize = 12;

  // Filtrado
  let filtered = products.filter(p => {
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchCat = !cat || p.category === cat;
    return matchQ && matchCat;
  });

  // Orden
  if (sort === "price_asc") filtered.sort((a,b) => a.price - b.price);
  else if (sort === "price_desc") filtered.sort((a,b) => b.price - a.price);
  else if (sort === "name_asc") filtered.sort((a,b) => a.name.localeCompare(b.name));
  else if (sort === "name_desc") filtered.sort((a,b) => b.name.localeCompare(a.name));
  else filtered.sort((a,b) => b.sold - a.sold); 

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  function updateParams(newParams) {
    const params = new URLSearchParams(useLocation().search);
    Object.keys(newParams).forEach(k => {
      if (newParams[k] === null) params.delete(k);
      else params.set(k, newParams[k]);
    });
    navigate(`/search?${params.toString()}`);
  }

  return (
    <div className="search-page">
      <div className="search-controls container-row">
        <div>
          <strong>Resultados:</strong> {total}
        </div>

        <div className="controls-right">
          <label>
            Ordenar:
            <select value={sort} onChange={(e) => updateParams({ sort: e.target.value, page: 1 })}>
              <option value="relevance">Más vendidos</option>
              <option value="price_asc">Precio ↑</option>
              <option value="price_desc">Precio ↓</option>
              <option value="name_asc">Nombre A-Z</option>
              <option value="name_desc">Nombre Z-A</option>
            </select>
          </label>
        </div>
      </div>

      <div className="search-body">
        <aside className="sidebar">
          <h4>Categorías</h4>
          <ul>
            <li>
              <button className={!cat ? "active" : ""} onClick={() => updateParams({ category: null, page: 1 })}>
                Todas
              </button>
            </li>
            {categories.map(c => (
              <li key={c}>
                <button
                  className={cat === c ? "active" : ""}
                  onClick={() => updateParams({ category: c, page: 1 })}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className="results">
          <div className="grid">
            {pageItems.map(p => <ProductCard key={p.id} product={p} />)}
          </div>

          <div className="pagination">
            <button disabled={currentPage <= 1} onClick={() => updateParams({ page: currentPage - 1 })}>
              « Anterior
            </button>
            <span> Página {currentPage} de {totalPages} </span>
            <button disabled={currentPage >= totalPages} onClick={() => updateParams({ page: currentPage + 1 })}>
              Siguiente »
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
