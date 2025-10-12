import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const [q, setQ] = React.useState("");
  const navigate = useNavigate();
  
  const { cart } = useCart();
  const { user, logout } = useAuth();
  
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  function onSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}&page=1`);
    }
  }

  function handleAccountClick(e) {
    e.preventDefault();
    if (user) {
      navigate("/user-dashboard");
    } else {
      navigate("/login");
    }
  }

  function handleLogout() {
    logout();
    navigate("/");
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
          
          <Link to="/cart" id="cart-link">
            Carrito {count > 0 && <span className="badge">{count}</span>}
          </Link>

          <a href="#footer">Contacto</a>

          <span style={{ 
            color: "rgba(255, 255, 255, 0.5)", 
            margin: "0 10px",
            userSelect: "none"
          }}>
            |
          </span>

          {user ? (
            <>
              <a href="#" onClick={handleAccountClick}>
                Hola, {user.name}
              </a>
              <button 
                onClick={handleLogout} 
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: "0",
                  fontSize: "inherit",
                  textDecoration: "underline",
                  marginLeft: "15px"
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <a href="#" onClick={handleAccountClick}>
              Mi cuenta
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}