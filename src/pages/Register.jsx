import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, user } = useAuth();
  const navigate = useNavigate();

  // Si ya está logueado, redirigir al dashboard
  React.useEffect(() => {
    if (user) {
      navigate("/user-dashboard");
    }
  }, [user, navigate]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function validateForm() {
    // Validar campos vacíos
    if (!formData.name || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    // Validar nombre (mínimo 2 caracteres)
    if (formData.name.trim().length < 2) {
      setError("El nombre debe tener al menos 2 caracteres");
      return false;
    }

    // Validar apellido (mínimo 2 caracteres)
    if (formData.lastName.trim().length < 2) {
      setError("El apellido debe tener al menos 2 caracteres");
      return false;
    }

    // Validar email
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Email inválido");
      return false;
    }

    // Validar contraseña (mínimo 6 caracteres)
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    //para apoyar a la gestion de usuarios se agrega localStorage
    const storedUsers = JSON.parse(localStorage.getItem("usuarios")) || [];

    const newUser = {
      id: Date.now(), // ID único temporal
      name: formData.name.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.toLowerCase().trim(),
      active: true, // Por defecto activo
    };

    storedUsers.push(newUser);
    localStorage.setItem("usuarios", JSON.stringify(storedUsers));

    // Intentar registro
    const result = register(
      formData.name.trim(),
      formData.lastName.trim(),
      formData.email.toLowerCase().trim(),
      formData.password
    );

    if (result.success) {
      // El usuario ya está logueado automáticamente después del registro
      navigate("/user-dashboard");
    } else {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "50px auto" }}>
      <div className="card">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Crear Cuenta
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
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
              Nombre *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Juan"
              autoComplete="given-name"
              disabled={loading}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
              Apellido *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Pérez"
              autoComplete="family-name"
              disabled={loading}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              autoComplete="email"
              disabled={loading}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
              Contraseña *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              autoComplete="new-password"
              disabled={loading}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
              Confirmar Contraseña *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              autoComplete="new-password"
              disabled={loading}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ fontSize: "13px", color: "#666", marginBottom: "15px" }}>
            * Todos los campos son obligatorios
          </div>

          <button type="submit" disabled={loading} style={{ width: "100%" }}>
            {loading ? "Creando cuenta..." : "Registrarse"}
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
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" style={{ color: "#007bff", fontWeight: "bold" }}>
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}