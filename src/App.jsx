import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Componentes Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Contextos y Hooks
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

// Páginas Públicas
import Home from "./pages/Home";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import OrderComplete from "./pages/OrderComplete";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Help from "./pages/Help";

// Páginas de Autenticación
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Páginas de Usuario
import UserDashboard from "./pages/UserDashboard";
import OrderDetail from "./pages/OrderDetail";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";

// Páginas de Administrador
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ProductosAdmin from "./pages/admin/ProductosAdmin";
import CategoriasAdmin from "./pages/admin/CategoriasAdmin";
import UserManagement from "./pages/admin/UserManagement";
import OrdersManagement from "./pages/admin/OrdersManagement";

export default function App() {
  // 1. Estados iniciales vacíos (esperando datos del backend)
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. useEffect para cargar los datos REALES desde el Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Usa la variable de entorno o localhost por defecto
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        
        console.log("Conectando al backend en:", apiUrl);

        // A. Cargar Productos
        const resProd = await fetch(`${apiUrl}/api/products`);
        if (resProd.ok) {
          const dataProd = await resProd.json();
          setProductList(dataProd);
        } else {
          console.error("Error cargando productos:", resProd.status);
        }

        // B. Cargar Categorías
        const resCat = await fetch(`${apiUrl}/api/categories`);
        if (resCat.ok) {
          const dataCat = await resCat.json();
          setCategoryList(dataCat);
        } else {
          console.error("Error cargando categorías:", resCat.status);
        }

      } catch (error) {
        console.error("Error crítico conectando al backend:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para activar/desactivar (Mantenida localmente por ahora para la UI)
  const toggleActive = (id) => {
    setProductList(prev => 
      prev.map(p => p.id === id ? { ...p, active: !p.active } : p)
    );
  };

  // Mostrar pantalla de carga mientras llegan los datos
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <h2>Cargando Superpoderes... ⚡</h2>
      </div>
    );
  }

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

          {/* 🛡️ Panel de administrador */}
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