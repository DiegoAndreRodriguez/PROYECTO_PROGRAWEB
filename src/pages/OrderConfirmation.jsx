import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function OrderConfirmationPage() {
    const { orderId } = useParams();

    return (
        <div className="container confirmation-page">
            <h2>¡Gracias por tu compra!</h2>
            <p>Tu pedido ha sido procesado con éxito.</p>
            <p>Tu número de orden es: <strong>{orderId}</strong></p>
            <p>Recibirás un correo electrónico con los detalles de tu pedido pronto.</p>
            <Link to="/" className="btn">Volver a la tienda</Link>
        </div>
    );
}
