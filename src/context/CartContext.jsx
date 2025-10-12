import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CART_KEY = "pw_cart";
const SAVED_KEY = "pw_saved";
const ORDERS_KEY = "pw_orders";
const LAST_ORDER_KEY = "pw_last_order_id";

// La función 'read' se mantiene igual
function read(key){
  try{
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch(e) {
    return [];
  }
}

export function CartProvider({children}){
  // Se inicializa el estado leyendo de localStorage UNA SOLA VEZ
  const [cart, setCart] = useState(() => read(CART_KEY));
  const [saved, setSaved] = useState(() => read(SAVED_KEY));

  // 1. ELIMINAMOS el useEffect que escuchaba el evento "cart_updated".
  //    Era el causante del bucle infinito.

  // 2. REEMPLAZAMOS los useEffect que usaban 'write' por una versión más directa.
  //    Ahora, solo escriben en localStorage cuando 'cart' o 'saved' cambian.
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved]);

  function addItem(product, qty=1){
    setCart(prev => {
      const found = prev.find(p=>p.id===product.id);
      if(found){
        return prev.map(p => p.id===product.id ? {...p, qty: p.qty + qty} : p);
      } else {
        return [...prev, {...product, qty}];
      }
    });
  }

  function updateQty(id, qty){
    if(qty<=0) return removeItem(id);
    setCart(prev => prev.map(p => p.id===id ? {...p, qty} : p));
  }

  function removeItem(id){
    setCart(prev => prev.filter(p => p.id!==id));
  }

  function saveForLater(id){
    setCart(prev => {
      const item = prev.find(p=>p.id===id);
      if(!item) return prev;
      setSaved(s => {
        if(s.find(x=>x.id===id)) return s;
        return [...s, {...item}];
      });
      return prev.filter(p=>p.id!==id);
    });
  }

  function moveToCartFromSaved(id){
    const item = read(SAVED_KEY).find(p=>p.id===id);
    if(!item) return;
    addItem(item, item.qty || 1);
    setSaved(s => s.filter(p=>p.id!==id));
  }

  function removeSaved(id){
    setSaved(s => s.filter(p => p.id!==id));
  }

  function clearCart(){
    setCart([]);
  }

  function placeOrder({customer, shipping, payment, shippingMethod}){
    const orders = read(ORDERS_KEY);
    const orderId = Date.now().toString(36);
    const order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer,
      shipping,
      payment,
      shippingMethod,
      items: cart,
      totals: {
        subtotal: cart.reduce((s,i)=>s + (i.price * (i.qty||1)),0),
        shipping: shippingMethod==="express" ? 10 : 5,
      },
      status: "created"
    };
    order.totals.total = order.totals.subtotal + order.totals.shipping;
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    localStorage.setItem(LAST_ORDER_KEY, orderId);
    clearCart();
    // 3. ELIMINAMOS el dispatchEvent de aquí también.
    //    clearCart() ya actualiza el estado, y los componentes serán notificados por React.
    return orderId;
  }

  return (
    <CartContext.Provider value={{
      cart, saved,
      addItem, updateQty, removeItem, saveForLater, moveToCartFromSaved, removeSaved,
      placeOrder, clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){
  return useContext(CartContext);
}