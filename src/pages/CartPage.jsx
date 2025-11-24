import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const { cartItems, savedForLater, updateItemQuantity, removeItem, moveToSavedForLater, moveToCart, cartTotal } = useCart();

    return (
        <div className="container cart-page">
            <h1>Tu Carrito</h1>
            {cartItems.length === 0 ? (
                <p>Tu carrito está vacío. <Link to="/">Sigue comprando</Link></p>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items-list">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-image-container">
                                    <img className="cart-item-image" src={item.image_url || item.image} alt={item.name} />
                                </div>
                                <div className="item-details">
                                    <h3>{item.name}</h3>
                                    <p className="price">${item.price}</p>
                                    <div className="item-actions">
                                        <button onClick={() => removeItem(item.id)}>Eliminar</button>
                                        <button onClick={() => moveToSavedForLater(item.id)}>Guardar para después</button>
                                    </div>
                                </div>
                                <div className="item-quantity">
                                    <input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value, 10))}
                                        min="1"
                                    />
                                </div>
                                <p className="item-total">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Resumen del Pedido</h2>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Envío</span>
                            <span>Gratis</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <Link to="/checkout" className="btn checkout-btn">Proceder al Pago</Link>
                    </div>
                </div>
            )}

            {savedForLater.length > 0 && (
                <div className="saved-for-later">
                    <h2>Guardado para Después</h2>
                    <div className="items-grid">
                        {savedForLater.map(item => (
                            <div key={item.id} className="saved-item-card">
                                <img className="saved-item-image" src={item.image_url || item.image} alt={item.name} />
                                <h4>{item.name}</h4>
                                <p>${item.price}</p>
                                <button onClick={() => moveToCart(item.id)} className="btn secondary">Mover al carrito</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
