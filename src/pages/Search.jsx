import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// Función mágica para ignorar acentos (física == fisica)
const normalizeText = (text) => {
    if (!text) return "";
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

export default function Search({ productList = [] }) {
    const query = useQuery();
    const navigate = useNavigate();

    const q = query.get("q") || "";
    const cat = query.get("category");
    const sort = query.get("sort") || "relevance";
    const page = Math.max(1, parseInt(query.get("page") || "1", 10));
    const pageSize = 12;

    // --- DEBUGGING (MIRA LA CONSOLA F12 SI ALGO FALLA) ---
    useEffect(() => {
        console.log("--- DEBUG SEARCH ---");
        console.log("Total productos recibidos:", productList.length);
        console.log("Buscando:", q);
        console.log("Filtro Categoría:", cat);
        if (productList.length > 0) {
            console.log("Ejemplo de producto:", productList[0]);
        }
    }, [productList, q, cat]);

    // 1. Obtener categorías disponibles
    const categories = [...new Set(productList.map((p) => p.category))].filter(Boolean);

    // 2. Filtrado Robusto
    let filtered = productList.filter((p) => {
        // A. Normalizamos todo a minúsculas y sin acentos
        const searchText = normalizeText(q);
        const productName = normalizeText(p.name);
        const productCat = normalizeText(p.category);
        const filterCat = normalizeText(cat);

        // B. Lógica de coincidencia
        const matchText = !searchText || productName.includes(searchText) || productCat.includes(searchText);
        const matchCategory = !filterCat || productCat === filterCat;

        // C. Verificamos que esté activo (Si 'active' viene undefined, asumimos true para probar)
        const isActive = p.active !== false;

        return matchText && matchCategory && isActive;
    });

    // 3. Ordenamiento
    if (sort === "price_asc") {
        filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "price_desc") {
        filtered.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === "name_asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "name_desc") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
    } else {
        // Por defecto: Más vendidos (asegurando que sean números)
        filtered.sort((a, b) => (Number(b.sold) || 0) - (Number(a.sold) || 0));
    }

    // 4. Paginación
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * pageSize;
    const pageItems = filtered.slice(start, start + pageSize);

    const updateParams = (newParams) => {
        const params = new URLSearchParams(query.toString());
        Object.keys(newParams).forEach((k) => {
            if (newParams[k] === null) params.delete(k);
            else params.set(k, newParams[k]);
        });
        navigate(`/search?${params.toString()}`);
    };

    return (
        <div className="search-page container" style={{ marginTop: "20px" }}>

            {/* BARRA DE CONTROLES (Ordenamiento) */}
            <div className="search-controls" style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                background: "#f1f1f1", padding: "15px", borderRadius: "8px", marginBottom: "20px", color: "#333"
            }}>
                <div>
                    Resultados encontrados: <strong>{total}</strong>
                </div>
                <div>
                    <label style={{ marginRight: "10px", fontWeight: "bold" }}>Ordenar por:</label>
                    <select
                        value={sort}
                        onChange={(e) => updateParams({ sort: e.target.value, page: 1 })}
                        style={{ padding: "5px" }}
                    >
                        <option value="relevance">Más vendidos</option>
                        <option value="price_asc">Precio: Menor a Mayor</option>
                        <option value="price_desc">Precio: Mayor a Menor</option>
                        <option value="name_asc">Nombre: A - Z</option>
                        <option value="name_desc">Nombre: Z - A</option>
                    </select>
                </div>
            </div>

            <div className="search-body" style={{ display: "flex", gap: "30px" }}>
                {/* SIDEBAR */}
                <aside className="sidebar" style={{ width: "250px", flexShrink: 0 }}>
                    <h3 style={{ borderBottom: "2px solid #ffd700", paddingBottom: "10px", marginBottom: "15px" }}>Categorías</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        <li style={{ marginBottom: "8px" }}>
                            <button
                                onClick={() => updateParams({ category: null, page: 1 })}
                                style={{
                                    width: "100%", textAlign: "left", padding: "8px", border: "none",
                                    background: !cat ? "#ffd700" : "transparent",
                                    fontWeight: !cat ? "bold" : "normal", cursor: "pointer", borderRadius: "4px", color: !cat ? "#000" : "#fff"
                                }}
                            >
                                Todas
                            </button>
                        </li>
                        {categories.map((c) => (
                            <li key={c} style={{ marginBottom: "8px" }}>
                                <button
                                    onClick={() => updateParams({ category: c, page: 1 })}
                                    style={{
                                        width: "100%", textAlign: "left", padding: "8px", border: "none",
                                        background: cat === c ? "#ffd700" : "transparent",
                                        fontWeight: cat === c ? "bold" : "normal", cursor: "pointer", borderRadius: "4px", color: cat === c ? "#000" : "#fff"
                                    }}
                                >
                                    {c}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* RESULTADOS */}
                <section style={{ flex: 1 }}>
                    {pageItems.length > 0 ? (
                        <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
                            {pageItems.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    ) : (
                        <div style={{ textAlign: "center", padding: "50px", background: "#222", borderRadius: "8px" }}>
                            <h3>No encontramos lo que buscas 🕵️</h3>
                            <p>Intenta revisar la ortografía o ver todas las categorías.</p>
                            <button onClick={() => { updateParams({ category: null }); navigate('/search'); }} className="btn">
                                Ver todos los productos
                            </button>
                        </div>
                    )}

                    {/* PAGINACIÓN */}
                    {totalPages > 1 && (
                        <div className="pagination" style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "40px" }}>
                            <button disabled={currentPage <= 1} onClick={() => updateParams({ page: currentPage - 1 })} className="btn secondary">
                                « Anterior
                            </button>
                            <span style={{ alignSelf: "center" }}>Página {currentPage} de {totalPages}</span>
                            <button disabled={currentPage >= totalPages} onClick={() => updateParams({ page: currentPage + 1 })} className="btn secondary">
                                Siguiente »
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}