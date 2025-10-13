import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Si ya está logueado, redirigir al dashboard
  React.useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/user-dashboard");
    }
  }, [user, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!email || !password) {
      setError("Por favor complete todos los campos");
      return;
    }

    if (!email.includes("@")) {
      setError("Email inválido");
      return;
    }

    setLoading(true);

    if (email === "admin@gmail.com" && password === "admin123") {
      const result = login(email, password); // <- pasar los 2 parámetros
      if (result.success) {
        navigate("/admin/dashboard");
      } else {
        setError(result.error);
      }
      setLoading(false);
      return;
    }

    // Intentar login
    const result = login(email, password);

    if (result?.success) {
      navigate("/user-dashboard");
    } else {
      setError(result?.error || "Credenciales incorrectas");
    }
    setLoading(false);
  }

  return (
    <div
      className="container"
      style={{ maxWidth: "500px", margin: "50px auto" }}
    >
      <div className="card">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Iniciar Sesión
        </h2>

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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
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

          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "500",
              }}
            >
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ textAlign: "right", marginBottom: "15px" }}>
            <Link
              to="/forgot-password"
              style={{ color: "#007bff", fontSize: "14px" }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            paddingTop: "20px",
            borderTop: "1px solid #ddd",
          }}
        >
          <p style={{ margin: 0 }}>
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              style={{ color: "#007bff", fontWeight: "bold" }}
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
