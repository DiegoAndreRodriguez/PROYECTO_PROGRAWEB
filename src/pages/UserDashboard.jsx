import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function UserDashboard() {
  const { user, getUserOrders } = useAuth();
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const ordersPerPage = 5;

  useEffect(() => {
    // Cargar órdenes del usuario
    const loadOrders = async () => {
      const result = await getUserOrders(currentPage, ordersPerPage);
      if (result.orders) {
        setOrders(result.orders);
        if (result.pagination) {
          setTotalPages(result.pagination.totalPages);
        }
      }
      setLoading(false);
    };

    loadOrders();
  }, [currentPage, getUserOrders]);

  function getStatusBadge(status) {
    const statusConfig = {
      pending: { text: "Pendiente", color: "#ffc107", bg: "#fff3cd" },
      processing: { text: "En proceso", color: "#17a2b8", bg: "#d1ecf1" },
      shipped: { text: "Enviado", color: "#007bff", bg: "#cce5ff" },
      delivered: { text: "Entregado", color: "#28a745", bg: "#d4edda" },
      cancelled: { text: "Cancelado", color: "#dc3545", bg: "#f8d7da" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: "12px",
          fontSize: "13px",
          fontWeight: "bold",
          color: config.color,
          background: config.bg,
        }}
      >
        {config.text}
      </span>
    );
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="container" style={{ maxWidth: "1000px", margin: "30px auto" }}>
      <div className="card">
        <div style={{ marginBottom: "30px" }}>
          <h2 style={{ marginBottom: "10px" }}>
            Bienvenido, {user?.firstName} {user?.lastName}
          </h2>
          <p style={{ color: "#666", margin: 0 }}>
            Administra tus órdenes y datos personales
          </p>
        </div>

        {/* Menú de navegación */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/user-dashboard"
            style={{
              padding: "10px 20px",
              background: "#007bff",
              color: "white",
              borderRadius: "4px",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Mis Órdenes
          </Link>
          <Link
            to="/profile"
            style={{
              padding: "10px 20px",
              background: "#6c757d",
              color: "white",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Editar Perfil
          </Link>
          <Link
            to="/change-password"
            style={{
              padding: "10px 20px",
              background: "#6c757d",
              color: "white",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Cambiar Contraseña
          </Link>
        </div>

        <hr style={{ margin: "30px 0" }} />

        {/* Lista de órdenes */}
        <h3 style={{ marginBottom: "20px" }}>Órdenes Recientes</h3>

        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
              background: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            Cargando órdenes...
          </div>
        ) : orders.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "50px 20px",
              background: "#f8f9fa",
              borderRadius: "8px",
            }}
          >
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              No tienes órdenes aún
            </p>
            <p style={{ color: "#666", marginBottom: "20px" }}>
              Empieza a comprar en nuestra tienda
            </p>
            <Link
              to="/search"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                background: "#007bff",
                color: "white",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              Explorar Productos
            </Link>
          </div>
        ) : (
          <>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginBottom: "20px",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid #ddd" }}>
                    <th style={{ padding: "12px", textAlign: "left" }}>ID Orden</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Fecha</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Total</th>
                    <th style={{ padding: "12px", textAlign: "left" }}>Estado</th>
                    <th style={{ padding: "12px", textAlign: "center" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      style={{ borderBottom: "1px solid #eee" }}
                    >
                      <td style={{ padding: "12px" }}>
                        <strong>#{order.id}</strong>
                      </td>
                      <td style={{ padding: "12px", fontSize: "14px" }}>
                        {formatDate(order.date)}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <strong>${order.total.toFixed(2)}</strong>
                      </td>
                      <td style={{ padding: "12px" }}>
                        {getStatusBadge(order.status)}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <Link
                          to={`/orders/${order.id}`}
                          style={{
                            padding: "6px 16px",
                            background: "#007bff",
                            color: "white",
                            borderRadius: "4px",
                            textDecoration: "none",
                            fontSize: "14px",
                          }}
                        >
                          Ver Detalle
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: "8px 16px",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  Anterior
                </button>

                <span
                  style={{
                    padding: "8px 16px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Página {currentPage} de {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "8px 16px",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}