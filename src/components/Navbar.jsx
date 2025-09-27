import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    const query = q.trim();
    navigate(`/search?q=${encodeURIComponent(query)}&page=1`);
  }

  return (
    <header className="navbar">
      <div className="nav-inner container-row">
        <Link to="/" className="brand">SuperPowers Store ⚡</Link>

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
          <a href="#footer">Contacto</a>
        </nav>
      </div>
    </header>
  );
}
