import React from "react";

export default function OrderComplete() {
  const lastId = localStorage.getItem("pw_last_order_id");
  const orders = JSON.parse(localStorage.getItem("pw_orders") || "[]");
  const order = orders.find(o => o.id === lastId);

  if (!order) {
    return (
      <div className="container order-complete">
        <div className="card">
          <h2>Gracias por tu visita</h2>
          <p>No se encontró una orden reciente.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container order-complete">
      <div className="card">
        <h2>¡Gracias por su compra!</h2>
        <p>Su pedido <strong>{order.id}</strong> fue recibido el {new Date(order.createdAt).toLocaleString()}.</p>
        <h3>Resumen</h3>
        <ul>
          {order.items.map(i => (
            <li key={i.id}>{i.name} x {i.qty || 1} - ${(i.price * (i.qty || 1)).toFixed(2)}</li>
          ))}
        </ul>
        <p>Envío: {order.shippingMethod}</p>
        <p>Total: ${order.totals.total.toFixed(2)}</p>
        <p>Se ha enviado un correo (simulado) a: {order.customer.email}</p>
      </div>
    </div>
  );
}
