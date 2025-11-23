import React from "react";
import { Link } from "react-router-dom"; 

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container-row">
        <div>© {new Date().getFullYear()} La Tienda del Multiverso ⚡</div>
        <div className="footer-links">
          {/* Usamos Link en lugar de <a> para la navegación interna */}
          <Link to="/terminos">Términos</Link>
          <Link to="/privacidad">Privacidad</Link>
          <Link to="/ayuda">Ayuda</Link>
        </div>
      </div>
    </footer>
  );
}
