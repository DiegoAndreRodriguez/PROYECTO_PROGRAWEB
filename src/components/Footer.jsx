import React from "react";

export default function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container-row">
        <div>© {new Date().getFullYear()} SuperPowers Store</div>
        <div className="footer-links">
          <a href="#">Términos</a>
          <a href="#">Privacidad</a>
          <a href="#">Ayuda</a>
        </div>
      </div>
    </footer>
  );
}
