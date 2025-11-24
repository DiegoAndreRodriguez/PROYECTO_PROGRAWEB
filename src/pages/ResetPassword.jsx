import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false,
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  }

  function togglePasswordVisibility(field) {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  }

  function validateForm() {
    // Validar campos vacíos
    if (!formData.newPassword || !formData.confirmPassword) {
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

    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const result = await resetPassword(token, formData.newPassword);

    if (result.success) {
      setSuccess(true);
      setLoading(false);
      // Redirigir a login después de 2 segundos
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setError(result.error || "Error al resetear contraseña");
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: "500px", margin: "50px auto" }}>
      <div className="card">
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Restablecer Contraseña
        </h2>

        <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
          Ingresa tu nueva contraseña
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
              ✅ Contraseña actualizada correctamente
            </p>
            <p style={{ margin: 0, fontSize: "14px" }}>
              Serás redirigido al inicio de sesión en unos segundos...
            </p>
          </div>
        )}

        {!success ? (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                }}
              >
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
                  disabled={loading}
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
                  disabled={loading}
                >
                  {showPasswords.new ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                }}
              >
                Confirmar Contraseña *
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu nueva contraseña"
                  autoComplete="new-password"
                  disabled={loading}
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
                  disabled={loading}
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

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.6 : 1,
              }}
            >
              {loading ? "Actualizando..." : "Restablecer Contraseña"}
            </button>
          </form>
        ) : (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => navigate("/login")}
              style={{ width: "100%" }}
            >
              Ir al inicio de sesión
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
