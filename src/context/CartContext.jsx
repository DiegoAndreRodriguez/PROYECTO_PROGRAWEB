import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth"; // Importamos auth para sacar el ID del usuario

const CartContext = createContext();
const CART_KEY = "pw_cart";

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
        catch (e) { return []; }
    });

    const { user } = useAuth(); // Obtenemos el usuario logueado
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }, [cart]);

    function addItem(product, qty = 1) {
        setCart(prev => {
            const found = prev.find(p => p.id === product.id);
            if (found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p);
            return [...prev, { ...product, qty }];
        });
    }

    function removeItem(id) {
        setCart(prev => prev.filter(p => p.id !== id));
    }

    function clearCart() {
        setCart([]);
    }

    // --- FUNCIÓN DE CHECKOUT CONECTADA AL BACKEND ---
    async function placeOrder({ customer, shipping, payment }) {
        // Calcular total
        const total = cart.reduce((acc, item) => acc + (Number(item.price) * item.qty), 0);

        try {
            const res = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user ? user.id : null, // Enviamos ID si está logueado
                    customer,
                    shipping,
                    payment,
                    items: cart,
                    total: total
                }),
            });

            if (!res.ok) throw new Error("Error en el servidor");

            const data = await res.json();
            clearCart(); // Limpiar carrito tras éxito
            return data.orderId;

        } catch (error) {
            console.error("Error checkout:", error);
            throw error; // Para que el componente muestre el error
        }
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, placeOrder }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() { return useContext(CartContext); }