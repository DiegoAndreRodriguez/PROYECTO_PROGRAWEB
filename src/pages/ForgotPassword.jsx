import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { recoverPassword } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validar email
    if (!email) {
      setError("Por favor ingresa tu email");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Email inválido");
      return;
    }

    setLoading(true);

    recoverPassword(email.toLowerCase().trim()).then((result) => {
      if (result.success) {
        setSuccess(true);
        setLoading(false);
      } else {
        setError(result.error);
        setLoading(false);
      }
    });
  }

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "50px auto" }}>
      <div className="card">
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Recuperar Contraseña
        </h2>
        
        <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
          Ingresa tu email y te enviaremos instrucciones para recuperar tu contraseña.
        </p>

        {error && (
          <div
            style={{
              background: "#f8d7da",
              color: "#721c24",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "20px",
              border: "1px solid #f5c6cb",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              background: "#d4edda",
              color: "#155724",
              padding: "15px",
              borderRadius: "4px",
              marginBottom: "20px",
              border: "1px solid #c3e6cb",
            }}
          >
            <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>
              ✅ Email enviado correctamente
            </p>
            <p style={{ margin: 0, fontSize: "14px" }}>
              Revisa tu bandeja de entrada y sigue las instrucciones para recuperar tu contraseña.
            </p>
          </div>
        )}

        {!success ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                autoComplete="email"
                disabled={loading}
                style={{ width: "100%" }}
              />
            </div>

            <button type="submit" disabled={loading} style={{ width: "100%", marginTop: "10px" }}>
              {loading ? "Enviando..." : "Enviar instrucciones"}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => navigate("/login")}
              style={{ width: "100%" }}
            >
              Volver al inicio de sesión
            </button>
          </div>
        )}

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            paddingTop: "20px",
            borderTop: "1px solid #ddd",
          }}
        >
          <p style={{ margin: "0 0 10px 0" }}>
            <Link to="/login" style={{ color: "#007bff" }}>
              ← Volver al inicio de sesión
            </Link>
          </p>
          <p style={{ margin: 0 }}>
            ¿No tienes cuenta?{" "}
            <Link to="/register" style={{ color: "#007bff", fontWeight: "bold" }}>
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}