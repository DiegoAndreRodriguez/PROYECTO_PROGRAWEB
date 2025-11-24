// c:\Users\Lenovo\Downloads\Trabajo final PrograWeb\Frontend\src\pages\Search.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const PRODUCTS_PER_PAGE = 12;

// Hook personalizado para leer los parámetros de la URL
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const query = useQuery();
    const searchTerm = query.get('q') || '';
    const currentCategory = query.get('category') || '';
    const currentPage = parseInt(query.get('page') || '1', 10);

    // 1. Obtener todos los datos de la API al cargar la página
    useEffect(() => {
        async function fetchData() {
            try {
                const [productsResponse, categoriesResponse] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/products`),
                    fetch(`${API_BASE_URL}/api/categories`),
                ]);

                if (!productsResponse.ok || !categoriesResponse.ok) {
                    throw new Error('No se pudieron cargar los datos del servidor.');
                }

                const productsData = await productsResponse.json();
                const categoriesData = await categoriesResponse.json();

                setAllProducts(productsData);
                setAllCategories(categoriesData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    // 2. Filtrar los productos cada vez que cambien los parámetros de búsqueda
    const filteredProducts = useMemo(() => {
        return allProducts.filter(product => {
            const matchesCategory = !currentCategory || product.category === currentCategory;
            const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [allProducts, searchTerm, currentCategory]);

    // 3. Calcular la paginación sobre los productos filtrados
    const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    // Función para manejar cambios en los filtros y actualizar la URL
    const handleFilterChange = (newCategory) => {
        const newQuery = new URLSearchParams();
        if (searchTerm) newQuery.set('q', searchTerm);
        if (newCategory) newQuery.set('category', newCategory);
        newQuery.set('page', '1'); // Resetear a la página 1
        navigate(`/search?${newQuery.toString()}`);
    };

    if (loading) return <div className="container">Cargando productos...</div>;
    if (error) return <div className="container error-message">{error}</div>;

    return (
        <div className="container search-page">
            <div className="search-layout">
                <aside className="filters-sidebar">
                    <h3>Categorías</h3>
                    <ul>
                        <li className={!currentCategory ? 'active' : ''}>
                            <a href="#" onClick={(e) => { e.preventDefault(); handleFilterChange(''); }}>
                                Todas
                            </a>
                        </li>
                        {allCategories.map(cat => (
                            <li key={cat.id} className={currentCategory === cat.name ? 'active' : ''}>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleFilterChange(cat.name); }}>
                                    {cat.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>
                <main className="results-content">
                    <h2>
                        {searchTerm 
                            ? `Resultados para "${searchTerm}"` 
                            : 'Explorar todos los poderes'
                        }
                    </h2>
                    {paginatedProducts.length > 0 ? (
                        <>
                            <div className="grid">
                                {paginatedProducts.map(p => (
                                    <ProductCard key={p.id} product={p} />
                                ))}
                            </div>
                            {/* Paginación */}
                            {totalPages > 1 && (
                                <div className="pagination">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                        <Link
                                            key={page}
                                            to={`/search?q=${searchTerm}&category=${currentCategory}&page=${page}`}
                                            className={currentPage === page ? 'active' : ''}
                                        >
                                            {page}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <p>No se encontraron productos que coincidan con tu búsqueda.</p>
                    )}
                </main>
            </div>
        </div>
    );
}
