import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ChangePassword() {
  const { changePassword } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess(false);
  }

  function togglePasswordVisibility(field) {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  }

  function validateForm() {
    // Validar campos vacíos
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("Todos los campos son obligatorios");
      return false;
    }

    // Validar longitud de nueva contraseña
    if (formData.newPassword.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres");
      return false;
    }

    // Validar que las contraseñas nuevas coincidan
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Las contraseñas nuevas no coinciden");
      return false;
    }

    // Validar que la nueva contraseña sea diferente a la actual
    if (formData.currentPassword === formData.newPassword) {
      setError("La nueva contraseña debe ser diferente a la actual");
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

    // Simular delay como si hubiera base de datos
    setTimeout(() => {
      const result = changePassword(formData.currentPassword, formData.newPassword);

      if (result.success) {
        setSuccess(true);
        setLoading(false);
        // Limpiar formulario
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
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
          <h2 style={{ marginBottom: "10px" }}>Cambiar Contraseña</h2>
          <p style={{ color: "#666", margin: 0 }}>
            Actualiza tu contraseña para mantener tu cuenta segura
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
              ✅ Contraseña cambiada correctamente
            </p>
            <p style={{ margin: 0, fontSize: "14px" }}>
              Serás redirigido al dashboard en unos segundos...
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
              Contraseña Actual *
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPasswords.current ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña actual"
                autoComplete="current-password"
                disabled={loading || success}
                style={{ paddingRight: "45px", width: "100%" }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: "5px",
                }}
                disabled={loading || success}
              >
                {showPasswords.current ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
              Nueva Contraseña *
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPasswords.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
                disabled={loading || success}
                style={{ paddingRight: "45px", width: "100%" }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: "5px",
                }}
                disabled={loading || success}
              >
                {showPasswords.new ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
              Confirmar Nueva Contraseña *
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPasswords.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu nueva contraseña"
                autoComplete="new-password"
                disabled={loading || success}
                style={{ paddingRight: "45px", width: "100%" }}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "14px",
                  padding: "5px",
                }}
                disabled={loading || success}
              >
                {showPasswords.confirm ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div style={{ fontSize: "13px", color: "#666", marginBottom: "15px" }}>
            * Todos los campos son obligatorios
          </div>

          {/* Indicador de fortaleza de contraseña */}
          {formData.newPassword && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "13px", margin: "0 0 5px 0" }}>
                Fortaleza de contraseña:
              </p>
              <div
                style={{
                  height: "6px",
                  background: "#e9ecef",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width:
                      formData.newPassword.length < 6
                        ? "33%"
                        : formData.newPassword.length < 10
                        ? "66%"
                        : "100%",
                    background:
                      formData.newPassword.length < 6
                        ? "#dc3545"
                        : formData.newPassword.length < 10
                        ? "#ffc107"
                        : "#28a745",
                    transition: "all 0.3s",
                  }}
                />
              </div>
              <p style={{ fontSize: "12px", margin: "5px 0 0 0", color: "#666" }}>
                {formData.newPassword.length < 6
                  ? "Débil"
                  : formData.newPassword.length < 10
                  ? "Media"
                  : "Fuerte"}
              </p>
            </div>
          )}

          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button
              type="submit"
              disabled={loading || success}
              style={{
                flex: 1,
                cursor: loading || success ? "not-allowed" : "pointer",
                opacity: loading || success ? 0.6 : 1,
              }}
            >
              {loading ? "Cambiando..." : "Cambiar Contraseña"}
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
        </form>

        {/* Consejos de seguridad */}
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            background: "#e7f3ff",
            borderRadius: "4px",
            fontSize: "13px",
          }}
        >
          <p style={{ margin: "0 0 8px 0", fontWeight: "bold" }}>
            Consejos para una contraseña segura:
          </p>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>Usa al menos 8 caracteres</li>
            <li>Combina letras, números y símbolos</li>
            <li>No uses información personal</li>
            <li>No reutilices contraseñas de otras cuentas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}