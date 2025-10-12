import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import OrderComplete from "./pages/OrderComplete";

export default function App() {
  return (
    <div className="app">
      <CartProvider>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-complete" element={<OrderComplete />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </div>
  );
}
