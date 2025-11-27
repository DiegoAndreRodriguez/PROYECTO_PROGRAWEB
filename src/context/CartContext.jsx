import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const getInitialState = (key, defaultValue) => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
        console.error(`Error reading localStorage key “${key}”:`, error);
        return defaultValue;
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => getInitialState('cartItems', []));
    const [savedForLater, setSavedForLater] = useState(() => getInitialState('savedForLater', []));

    useEffect(() => {
        window.localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        window.localStorage.setItem('savedForLater', JSON.stringify(savedForLater));
    }, [savedForLater]);

    const addItem = (product, quantity) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeItem = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateItemQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeItem(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const moveToSavedForLater = (productId) => {
        const itemToMove = cartItems.find(item => item.id === productId);
        if (itemToMove) {
            setSavedForLater(prev => [...prev, itemToMove]);
            removeItem(productId);
        }
    };

    const moveToCart = (productId) => {
        const itemToMove = savedForLater.find(item => item.id === productId);
        if (itemToMove) {
            addItem(itemToMove, itemToMove.quantity);
            setSavedForLater(prev => prev.filter(item => item.id !== productId));
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const value = {
        cartItems,
        savedForLater,
        addItem,
        removeItem,
        updateItemQuantity,
        moveToSavedForLater,
        moveToCart,
        clearCart,
        cartCount,
        cartTotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};