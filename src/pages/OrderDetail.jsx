import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function OrderDetail() {
  const { id } = useParams();
  const { user, getOrderDetail, cancelOrder } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    // Cargar la orden específica
    const loadOrder = async () => {
      const foundOrder = await getOrderDetail(id);
      if (foundOrder) {
        setOrder(foundOrder);
      }
      setLoading(false);
    };

    loadOrder();
  }, [id, getOrderDetail]);

  async function handleCancelOrder() {
    if (!confirm("¿Estás seguro de que deseas cancelar esta orden?")) {
      return;
    }

    setCancelling(true);

    const result = await cancelOrder(id);

    if (result.success) {
      // Actualizar el estado de la orden
      setOrder({ ...order, status: "cancelled" });
      alert("Orden cancelada exitosamente");
    } else {
      alert(result.error || "Error al cancelar la orden");
    }

    setCancelling(false);
  }

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
          padding: "6px 16px",
          borderRadius: "12px",
          fontSize: "15px",
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

  if (loading) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "50px" }}>
        Cargando...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container" style={{ maxWidth: "600px", margin: "50px auto" }}>
        <div className="card" style={{ textAlign: "center", padding: "50px" }}>
          <h2 style={{ marginBottom: "20px" }}>Orden no encontrada</h2>
          <p style={{ color: "#666", marginBottom: "30px" }}>
            La orden que buscas no existe o no tienes permiso para verla.
          </p>
          <Link
            to="/user-dashboard"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "#007bff",
              color: "white",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Volver a Mis Órdenes
          </Link>
        </div>
      </div>
    );
  }

  const canCancel = order.status === "pending";

  return (
    <div className="container" style={{ maxWidth: "900px", margin: "30px auto" }}>
      <div className="card">
        {/* Header */}
        <div style={{ marginBottom: "30px" }}>
          <Link
            to="/user-dashboard"
            style={{ color: "#007bff", textDecoration: "none", marginBottom: "15px", display: "inline-block" }}
          >
            ← Volver a Mis Órdenes
          </Link>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px" }}>
            <div>
              <h2 style={{ marginBottom: "5px" }}>
                Orden #{order.id.slice(-8)}
              </h2>
              <p style={{ color: "#666", margin: 0 }}>
                Realizada el {formatDate(order.date)}
              </p>
            </div>
            <div>{getStatusBadge(order.status)}</div>
          </div>
        </div>

        <hr style={{ margin: "30px 0" }} />

        {/* Información del cliente */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Información del Cliente</h3>
          <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
            <p style={{ margin: "5px 0" }}>
              <strong>Nombre:</strong> {user?.firstName} {user?.lastName}
            </p>
            <p style={{ margin: "5px 0" }}>
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        </div>

        {/* Dirección de envío */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Dirección de Envío</h3>
          <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
            <p style={{ margin: "5px 0" }}>{order.shippingAddress}</p>
            <p style={{ margin: "10px 0 5px 0" }}>
              <strong>Método de envío:</strong>{" "}
              {order.shippingMethod === "express" ? "Express" : "Estándar"}
            </p>
          </div>
        </div>

        {/* Productos */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Productos</h3>
          <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
            {order.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderBottom: "1px solid #dee2e6",
                }}
              >
                <div>
                  <p style={{ margin: "0 0 5px 0", fontWeight: "bold" }}>
                    {item.name}
                  </p>
                  <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                    Cantidad: {item.qty}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                  <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
                    ${item.price.toFixed(2)} c/u
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen de pago */}
        <div style={{ marginBottom: "30px" }}>
          <h3 style={{ marginBottom: "15px" }}>Resumen de Pago</h3>
          <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span>Total:</span>
              <span>${order.totalAmount.toFixed(2)}</span>
            </div>
            <hr style={{ margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "18px" }}>
              <strong>Total:</strong>
              <strong>${order.totalAmount.toFixed(2)}</strong>
            </div>
            <div style={{ marginTop: "15px", paddingTop: "15px", borderTop: "1px solid #dee2e6" }}>
              <p style={{ margin: 0, fontSize: "14px" }}>
                <strong>Método de pago:</strong>{" "}
                {order.paymentMethod === "qr" ? "Código QR" : "Tarjeta de Crédito"}
              </p>
            </div>
          </div>
        </div>

        {/* Botón de cancelación */}
        {canCancel && (
          <div style={{ textAlign: "center", paddingTop: "20px", borderTop: "1px solid #ddd" }}>
            <button
              onClick={handleCancelOrder}
              disabled={cancelling}
              style={{
                padding: "12px 30px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: cancelling ? "not-allowed" : "pointer",
                opacity: cancelling ? 0.6 : 1,
              }}
            >
              {cancelling ? "Cancelando..." : "Cancelar Orden"}
            </button>
            <p style={{ marginTop: "10px", fontSize: "13px", color: "#666" }}>
              Esta acción no se puede deshacer
            </p>
          </div>
        )}

        {order.status === "cancelled" && (
          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              background: "#f8d7da",
              border: "1px solid #f5c6cb",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, color: "#721c24" }}>
              Esta orden ha sido cancelada
            </p>
          </div>
        )}
      </div>
    </div>
  );
}