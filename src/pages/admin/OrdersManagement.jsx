import React, { useState, useEffect } from "react";

export default function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("pw_orders") || "[]");
    setOrders(storedOrders);
  }, []);

  // Actualizar estado de la orden
  function updateOrderStatus(orderId, newStatus) {
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem("pw_orders", JSON.stringify(updatedOrders));

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  }

  // Filtrado por estado
  const filteredOrders =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status.toLowerCase() === filter.toLowerCase());

  // Paginación
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Gestión de Órdenes</h1>

      {/* Filtro */}
      <div style={{ marginBottom: "1rem" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>Filtrar por estado:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">Todos</option>
          <option value="pending">Pendiente</option>
          <option value="processing">En proceso</option>
          <option value="shipped">Enviado</option>
          <option value="delivered">Entregado</option>
          <option value="standby">Stand by</option>
          <option value="cancelled">Cancelado</option>
        </select>
      </div>

      {/* Tabla moderna */}
      <table style={{ width: "100%", borderCollapse: "collapse", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <thead style={{ background: "#007bff", color: "#fff" }}>
          <tr>
            <th style={{ padding: "10px" }}>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((o) => (
            <tr key={o.id} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ padding: "8px" }}>{o.id.slice(-8)}</td>
              <td>{o.customer.name}</td>
              <td>${o.totals.total.toFixed(2)}</td>
              <td>
                <select
                  value={o.status}
                  onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                  style={{ padding: "4px", borderRadius: "4px" }}
                >
                  <option value="pending">Pendiente</option>
                  <option value="processing">En proceso</option>
                  <option value="shipped">Enviado</option>
                  <option value="delivered">Entregado</option>
                  <option value="standby">Stand by</option>
                  <option value="cancelled">Cancelado</option>
                </select>
              </td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
              <td>
                <button
                  onClick={() => setSelectedOrder(o)}
                  style={{ marginRight: "5px", padding: "4px 8px", cursor: "pointer" }}
                >
                  Ver detalle
                </button>
                <button
                  onClick={() => {
                    if (window.confirm("¿Deseas eliminar esta orden?")) {
                      const filtered = orders.filter((x) => x.id !== o.id);
                      setOrders(filtered);
                      localStorage.setItem("pw_orders", JSON.stringify(filtered));
                    }
                  }}
                  style={{
                    padding: "4px 8px",
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      {totalPages > 1 && (
        <div style={{ marginTop: "1rem" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              style={{
                marginRight: "5px",
                padding: "5px 10px",
                background: p === currentPage ? "#007bff" : "#eee",
                color: p === currentPage ? "#fff" : "#000",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Modal de detalle */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              width: "600px",
              maxHeight: "90%",
              overflowY: "auto",
              borderRadius: "8px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Detalle de Orden #{selectedOrder.id.slice(-8)}</h2>
            <p><strong>Cliente:</strong> {selectedOrder.customer.name}</p>
            <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
            <p><strong>Estado:</strong> {selectedOrder.status}</p>
            <p><strong>Fecha:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>

            <h3>Productos</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1rem" }}>
              <thead>
                <tr style={{ background: "#007bff", color: "#fff" }}>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((i) => (
                  <tr key={i.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td>{i.name}</td>
                    <td>{i.qty || 1}</td>
                    <td>${(i.price * (i.qty || 1)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Resumen de pago</h3>
            <p><strong>Subtotal:</strong> ${selectedOrder.totals.subtotal.toFixed(2)}</p>
            <p><strong>Envío:</strong> ${selectedOrder.totals.shipping.toFixed(2)}</p>
            <p><strong>Total:</strong> ${selectedOrder.totals.total.toFixed(2)}</p>

            <h3>Dirección de envío</h3>
            <p>{selectedOrder.shipping.address}, {selectedOrder.shipping.city}, {selectedOrder.shipping.postal}</p>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button onClick={() => setSelectedOrder(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
