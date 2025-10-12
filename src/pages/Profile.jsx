import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess(false);
  }

  function validateForm() {
    // Validar campos vacíos
    if (!formData.name || !formData.lastName || !formData.email) {
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

    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simular delay
    setTimeout(() => {
      const result = updateProfile(
        formData.name.trim(),
        formData.lastName.trim(),
        formData.email.toLowerCase().trim()
      );

      if (result.success) {
        setSuccess(true);
        setLoading(false);
        // Redirigir después de 2 segundos
        setTimeout(() => {
          navigate("/user-dashboard");
        }, 2000);
      } else {
        setError(result.error);
        setLoading(false);
      }
    }, 500);
  }

  const hasChanges =
    formData.name !== user.name ||
    formData.lastName !== user.lastName ||
    formData.email !== user.email;

  return (
    <div className="container" style={{ maxWidth: "600px", margin: "30px auto" }}>
      <div className="card">
        <div style={{ marginBottom: "30px" }}>
          <Link
            to="/user-dashboard"
            style={{
              color: "#007bff",
              textDecoration: "none",
              marginBottom: "15px",
              display: "inline-block",
            }}
          >
            ← Volver al Dashboard
          </Link>
          <h2 style={{ marginBottom: "10px" }}>Editar Perfil</h2>
          <p style={{ color: "#666", margin: 0 }}>
            Actualiza tu información personal
          </p>
        </div>

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
            <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
              ✅ Perfil actualizado correctamente
            </p>
            <p style={{ margin: 0, fontSize: "14px" }}>
              Serás redirigido al dashboard en unos segundos...
            </p>
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
              disabled={loading || success}
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
              disabled={loading || success}
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
              disabled={loading || success}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ fontSize: "13px", color: "#666", marginBottom: "15px" }}>
            * Todos los campos son obligatorios
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              type="submit"
              disabled={loading || success || !hasChanges}
              style={{
                flex: 1,
                cursor:
                  loading || success || !hasChanges ? "not-allowed" : "pointer",
                opacity: loading || success || !hasChanges ? 0.6 : 1,
              }}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/user-dashboard")}
              disabled={loading || success}
              style={{
                flex: 1,
                background: "#6c757d",
                cursor: loading || success ? "not-allowed" : "pointer",
                opacity: loading || success ? 0.6 : 1,
              }}
            >
              Cancelar
            </button>
          </div>

          {!hasChanges && (
            <p
              style={{
                textAlign: "center",
                marginTop: "15px",
                fontSize: "13px",
                color: "#666",
              }}
            >
              No hay cambios para guardar
            </p>
          )}
        </form>

        <div
          style={{
            marginTop: "30px",
            paddingTop: "20px",
            borderTop: "1px solid #ddd",
          }}
        >
          <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}>
            ¿Deseas cambiar tu contraseña?
          </p>
          <Link
            to="/change-password"
            style={{
              display: "inline-block",
              padding: "8px 16px",
              background: "#17a2b8",
              color: "white",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            Cambiar Contraseña
          </Link>
        </div>
      </div>
    </div>
  );
}