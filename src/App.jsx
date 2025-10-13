import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import OrderComplete from "./pages/OrderComplete";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";

// Páginas de autenticación
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Páginas de usuario (protegidas)
import UserDashboard from "./pages/UserDashboard";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

// Componente de protección de rutas
import ProtectedRoute from "./components/ProtectedRoute";

// Pantallas de administrador
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import CategoriasAdmin from "./pages/admin/CategoriasAdmin";
import UserManagement from "./pages/admin/UserManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";


// Datos iniciales
import { products, categories } from "./data/products";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  // Estado global de productos
  const [productList, setProductList] = useState(
    products.map((p) => ({ ...p, active: true }))
  );

  // Estado global de categorías
  const [categoryList, setCategoryList] = useState(
    categories.map((name, index) => ({
      id: index + 1,
      name,
      description: "",
      products: [],
    }))
  );

  // Función para activar/desactivar productos
  const toggleActive = (id) => {
    setProductList(
      productList.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  return (
    <div className="app">
      <AuthProvider>
        <AppRoutes
          productList={productList}
          setProductList={setProductList}
          toggleActive={toggleActive}
          categoryList={categoryList}
          setCategoryList={setCategoryList}
        />
      </AuthProvider>
    </div>
  );
}

function AppRoutes({
  productList,
  setProductList,
  toggleActive,
  categoryList,
  setCategoryList,
}) {
  const { user } = useAuth();

  return (
    <CartProvider>
      <Navbar />
      <main className="container">
        <Routes>
          {/* 🌍 Rutas públicas */}
          <Route path="/" element={<Home productList={productList} />} />
          <Route
            path="/search"
            element={<Search productList={productList} />}
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-complete" element={<OrderComplete />} />
          <Route path="/terminos" element={<Terms />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/ayuda" element={<Help />} />

          {/* 🔑 Autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* 👤 Usuario logueado */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <ProtectedRoute>
                <OrderDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />

          {/* Panel de administrador */}
          {user && user.role === "admin" ? (
            <>
              <Route path="/admin/dashboard" element={<DashboardAdmin />} />
              <Route
                path="/admin/productos"
                element={
                  <ProductosAdmin
                    productList={productList}
                    setProductList={setProductList}
                    toggleActive={toggleActive}
                    categoryList={categoryList}
                  />
                }
              />
              <Route
                path="/admin/categorias"
                element={
                  <CategoriasAdmin
                    categoryList={categoryList}
                    setCategoryList={setCategoryList}
                    productList={productList}
                  />
                }
              />
              <Route path="/admin/gestionar-usuarios" element={<UserManagement />} />
              <Route path="/admin/orders-management" element={<OrdersManagement />} />
            </>
          ) : (
            <Route path="/admin/*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  );
}
