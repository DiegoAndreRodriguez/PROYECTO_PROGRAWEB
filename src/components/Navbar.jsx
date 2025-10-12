import React from "react";
import { Link, useNavigate } from "react-router-dom";
// 1. Importa el hook 'useCart' que ya creaste
import { useCart } from "../context/CartContext";

export default function Navbar() {
  // El estado 'q' para la búsqueda se mantiene igual
  const [q, setQ] = React.useState("");
  const navigate = useNavigate();

  // 2. Usa el hook para obtener el estado del carrito directamente
  const { cart } = useCart();

  // 3. Calcula el total de ítems directamente del estado 'cart'
  //    No necesitas useEffect ni event listeners para esto.
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  function onSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}&page=1`);
    }
  }

  return (
    <header className="navbar">
      <div className="nav-inner container-row">
        <Link to="/" className="brand">
          SuperPowers Store ⚡
        </Link>

        <form onSubmit={onSubmit} className="search-form">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nombre o categoría..."
            aria-label="Buscar"
          />
          <button type="submit">Buscar</button>
        </form>

        <nav className="nav-links">
          <Link to="/search">Explorar</Link>
          {/* 4. El resto del código funciona igual, pero ahora se actualiza reactivamente */}
          <Link to="/cart" id="cart-link">
            Carrito {count > 0 && <span className="badge">{count}</span>}
          </Link>
          <a href="#footer">Contacto</a>
        </nav>
      </div>
    </header>
  );
}