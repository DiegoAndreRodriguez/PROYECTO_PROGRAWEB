import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

// --- Componente para un solo item del carrito ---
function CartItem({ item, updateQty, removeItem, saveForLater }) {
  return (
    <div className="cart-item">
      {/* Puedes agregar una imagen si tu objeto 'item' la tiene */}
      {/* <img src={item.image} alt={item.name} className="item-image" /> */}
      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="item-price">${item.price.toFixed(2)}</p>
        <p className="item-subtotal">
          Subtotal: <strong>${(item.price * item.qty).toFixed(2)}</strong>
        </p>
      </div>
      <div className="item-controls">
        <div className="quantity-selector">
          <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
          <span>{item.qty}</span>
          <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
        </div>
        <div className="item-actions">
           <button onClick={() => saveForLater(item.id)} className="action-link">Guardar</button>
           <button onClick={() => removeItem(item.id)} className="action-link">Eliminar</button>
        </div>
      </div>
    </div>
  );
}


// --- Componente principal de la página del carrito ---
export default function CartPage() {
  const { cart, saved, updateQty, removeItem, saveForLater, moveToCartFromSaved, removeSaved } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((s, i) => s + i.price * (i.qty || 1), 0);
  const shipping = subtotal > 0 ? 5.00 : 0; // Envío gratis si el carrito está vacío
  const total = subtotal + shipping;

  if (cart.length === 0 && saved.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>Tu carrito está vacío</h2>
        <p>¡Añade algunos superpoderes a tu colección!</p>
        <Link to="/search" className="btn">
          Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1>Tu Carrito</h1>
      <div className="cart-layout">
        <div className="cart-items-list">
          {cart.length > 0 ? (
            cart.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                updateQty={updateQty}
                removeItem={removeItem}
                saveForLater={saveForLater}
              />
            ))
          ) : (
            <p>No hay artículos en tu carrito.</p>
          )}
        </div>

        {cart.length > 0 && (
          <aside className="order-summary">
            <h2>Resumen del Pedido</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button onClick={() => navigate("/checkout")} className="btn btn-checkout">
              Continuar al Checkout
            </button>
          </aside>
        )}
      </div>
      
      {saved.length > 0 && (
        <div className="saved-for-later">
          <h2>Guardado para Después</h2>
          <div className="saved-items-grid">
            {saved.map(item => (
              <div key={item.id} className="saved-item product-card">
                {/* <img src={item.image} alt={item.name} /> */}
                <div className="card-body">
                   <h3>{item.name}</h3>
                   <p className="price">${item.price.toFixed(2)}</p>
                   <div className="card-actions">
                      <button onClick={() => moveToCartFromSaved(item.id)} className="btn">Mover al carrito</button>
                      <button onClick={() => removeSaved(item.id)} className="btn secondary">Eliminar</button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}