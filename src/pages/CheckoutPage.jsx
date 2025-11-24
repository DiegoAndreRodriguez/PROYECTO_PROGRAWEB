import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user, token, loading: authLoading } = useAuth(); // Obtenemos el estado de carga de la autenticación
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Usamos useEffect para manejar la redirección como un efecto secundario
    useEffect(() => {
        // Solo redirigimos cuando sabemos con certeza que no hay usuario (authLoading es false)
        if (!authLoading && !user) {
            navigate('/login?redirect=/checkout');
        }
    }, [user, authLoading, navigate]);

    // Mientras se verifica la autenticación o si no hay usuario, no mostramos el formulario
    if (authLoading || !user) {
        return <div>Cargando...</div>; // O un spinner de carga
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!shippingAddress) {
            setError('Por favor, ingresa una dirección de envío.');
            return;
        }
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    cartItems,
                    shippingAddress,
                    paymentMethod,
                    totalAmount: cartTotal
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'No se pudo crear el pedido.');
            }

            clearCart();
            navigate(`/order-confirmation/${data.orderId}`);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container checkout-page">
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-section">
                    <h2>Dirección de Envío</h2>
                    <textarea
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Ingresa tu dirección completa"
                        required
                    />
                </div>

                <div className="form-section">
                    <h2>Método de Pago</h2>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="card">Tarjeta de Crédito/Débito</option>
                        <option value="qr">Pago con QR</option>
                    </select>
                    {/* Aquí podrías mostrar campos de tarjeta o un código QR */}
                </div>

                <div className="order-summary">
                    <h2>Resumen</h2>
                    <p>Total a pagar: <strong>${cartTotal.toFixed(2)}</strong></p>
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="btn" disabled={loading}>
                    {loading ? 'Procesando...' : 'Finalizar Compra'}
                </button>
            </form>
        </div>
    );
}
