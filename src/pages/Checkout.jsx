import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cart, placeOrder } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [customer, setCustomer] = useState({ name: "", email: "" });
  const [shipping, setShipping] = useState({ 
    address: "", 
    city: "", 
    postal: "", 
    country: "" 
  });
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "" });

  // Auto-completar datos si el usuario está logueado
  useEffect(() => {
    if (user) {
      setCustomer({
        name: `${user.name} ${user.lastName}`,
        email: user.email,
      });
    }
  }, [user]);

  const subtotal = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);

  function validate() {
    if (cart.length === 0) {
      alert("Carrito vacío");
      return false;
    }
    if (!customer.name || !customer.email) {
      alert("Completa tus datos personales");
      return false;
    }
    if (!shipping.address || !shipping.city) {
      alert("Completa la dirección de envío");
      return false;
    }
    if (paymentMethod === "card") {
      if (!card.number || !card.expiry || !card.cvv) {
        alert("Completa los datos de la tarjeta");
        return false;
      }
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    // Crear la orden
    const order = {
      id: Date.now().toString(),
      userId: user ? user.id : null, // null si es invitado
      customer,
      shipping,
      payment: {
        method: paymentMethod,
        card:
          paymentMethod === "card"
            ? { number: "**** **** **** " + card.number.slice(-4) }
            : null,
      },
      shippingMethod,
      items: cart,
      subtotal,
      shippingCost: shippingMethod === "express" ? 10 : 5,
      total: subtotal + (shippingMethod === "express" ? 10 : 5),
      date: new Date().toISOString(),
      status: "pending",
    };

    // Guardar la orden en localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Limpiar carrito y redirigir
    placeOrder({
      customer,
      shipping,
      payment: order.payment,
      shippingMethod,
    });
    
    navigate("/order-complete", { state: { orderId: order.id } });
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Checkout</h2>
        
        {!user && (
          <div className="guest-notice" style={{
            background: "#fff3cd",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "4px",
            border: "1px solid #ffc107"
          }}>
            <p>
              ¿Ya tienes cuenta?{" "}
              <a href="/login" style={{ color: "#007bff", fontWeight: "bold" }}>
                Inicia sesión
              </a>{" "}
              para autocompletar tus datos.
            </p>
          </div>
        )}

        <div className="checkout-grid">
          <form onSubmit={handleSubmit} className="checkout-form">
            <h3>Datos del cliente</h3>
            <label>
              Nombre
              <input
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                disabled={!!user}
              />
            </label>
            <label>
              Email
              <input
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                disabled={!!user}
              />
            </label>

            <h3>Dirección de envío</h3>
            <label>
              Dirección
              <input
                value={shipping.address}
                onChange={(e) =>
                  setShipping({ ...shipping, address: e.target.value })
                }
              />
            </label>
            <label>
              Ciudad
              <input
                value={shipping.city}
                onChange={(e) =>
                  setShipping({ ...shipping, city: e.target.value })
                }
              />
            </label>
            <label>
              Código postal
              <input
                value={shipping.postal}
                onChange={(e) =>
                  setShipping({ ...shipping, postal: e.target.value })
                }
              />
            </label>
            <label>
              País
              <input
                value={shipping.country}
                onChange={(e) =>
                  setShipping({ ...shipping, country: e.target.value })
                }
              />
            </label>

            <h3>Método de envío</h3>
            <label>
              <input
                type="radio"
                name="sh"
                value="standard"
                checked={shippingMethod === "standard"}
                onChange={() => setShippingMethod("standard")}
              />{" "}
              Envío estándar ($5)
            </label>
            <label>
              <input
                type="radio"
                name="sh"
                value="express"
                checked={shippingMethod === "express"}
                onChange={() => setShippingMethod("express")}
              />{" "}
              Envío express ($10)
            </label>

            <h3>Pago</h3>
            <label>
              <input
                type="radio"
                name="pm"
                value="qr"
                checked={paymentMethod === "qr"}
                onChange={() => setPaymentMethod("qr")}
              />{" "}
              Código QR
            </label>
            <label>
              <input
                type="radio"
                name="pm"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
              />{" "}
              Tarjeta
            </label>

            {paymentMethod === "qr" ? (
              <div className="qr-box">
                <svg
                  width="180"
                  height="180"
                  viewBox="0 0 100 100"
                  style={{ border: "1px solid #ddd" }}
                >
                  <rect x="0" y="0" width="30" height="30" />
                  <rect x="70" y="0" width="30" height="30" />
                  <rect x="0" y="70" width="30" height="30" />
                  <rect x="40" y="40" width="20" height="20" />
                  <rect x="60" y="60" width="10" height="10" />
                </svg>
                <p>Escanea el código con tu app bancaria para pagar.</p>
              </div>
            ) : (
              <div className="card-box">
                <label>
                  Número
                  <input
                    value={card.number}
                    onChange={(e) =>
                      setCard({ ...card, number: e.target.value })
                    }
                    placeholder="4111 1111 1111 1111"
                  />
                </label>
                <label>
                  Expiración
                  <input
                    value={card.expiry}
                    onChange={(e) =>
                      setCard({ ...card, expiry: e.target.value })
                    }
                    placeholder="MM/YY"
                  />
                </label>
                <label>
                  CVV
                  <input
                    value={card.cvv}
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    placeholder="123"
                  />
                </label>
              </div>
            )}

            <div style={{ marginTop: 10 }}>
              <button type="submit">Completar orden</button>
            </div>
          </form>

          <aside className="order-summary">
            <h3>Resumen del pedido</h3>
            <ul>
              {cart.map((i) => (
                <li key={i.id}>
                  {i.name} x {i.qty || 1} - ${(i.price * (i.qty || 1)).toFixed(2)}
                </li>
              ))}
            </ul>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>
              Envío: {shippingMethod === "express" ? "$10.00" : "$5.00"}
            </p>
            <p>
              <strong>
                Total: $
                {(subtotal + (shippingMethod === "express" ? 10 : 5)).toFixed(2)}
              </strong>
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
}