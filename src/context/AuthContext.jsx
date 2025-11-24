import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Exportar el contexto para usarlo en useAuth
export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login con backend
  async function login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Error al iniciar sesión" };
      }

      const userData = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: "user",
      };

      setToken(data.token);
      setUser(userData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, error: "Error de conexión" };
    }
  }

  // Registro con backend
  async function register(firstName, lastName, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Error al registrar" };
      }

      const userData = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: "user",
      };

      setToken(data.token);
      setUser(userData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true };
    } catch (err) {
      console.error("Register error:", err);
      return { success: false, error: "Error de conexión" };
    }
  }

  // Logout
  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  // Actualizar perfil con backend
  async function updateProfile(firstName, lastName, email) {
    if (!user || !token) {
      return { success: false, error: "No hay usuario logueado" };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Error al actualizar perfil" };
      }

      const updatedUser = {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        role: "user",
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return { success: true };
    } catch (err) {
      console.error("Update profile error:", err);
      return { success: false, error: "Error de conexión" };
    }
  }

  // Cambiar contraseña con backend
  async function changePassword(currentPassword, newPassword) {
    if (!user || !token) {
      return { success: false, error: "No hay usuario logueado" };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Error al cambiar contraseña" };
      }

      return { success: true };
    } catch (err) {
      console.error("Change password error:", err);
      return { success: false, error: "Error de conexión" };
    }
  }

  // Recuperar contraseña con backend
  async function recoverPassword(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Error al enviar email" };
      }

      return { success: true };
    } catch (err) {
      console.error("Recover password error:", err);
      return { success: false, error: "Error de conexión" };
    }
  }

  // Resetear contraseña con backend
  async function resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Error al resetear contraseña" };
      }

      return { success: true };
    } catch (err) {
      console.error("Reset password error:", err);
      return { success: false, error: "Error de conexión" };
    }
  }

  // Obtener órdenes del usuario con backend
  async function getUserOrders(page = 1, limit = 10) {
    if (!user || !token) return { orders: [], pagination: null };

    try {
      const response = await fetch(
        `${API_BASE_URL}/orders?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        return { orders: [], pagination: null };
      }

      const data = await response.json();
      return {
        orders: data.orders.map((order) => ({
          id: order.id,
          total: parseFloat(order.totalAmount), // Convertimos el string a número
          status: order.status,
          date: order.createdAt,
          paymentMethod: order.paymentMethod,
          shippingMethod: order.shippingMethod,
        })),
        pagination: data.pagination,
      };
    } catch (err) {
      console.error("Get orders error:", err);
      return { orders: [], pagination: null };
    }
  }

  // Obtener detalle de una orden
  async function getOrderDetail(orderId) {
    if (!user || !token) return null;

    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return {
        id: data.id,
        totalAmount: parseFloat(data.totalAmount), // Convertimos el total a número
        status: data.status,
        paymentMethod: data.paymentMethod,
        shippingAddress: data.shippingAddress,
        shippingMethod: data.shippingMethod,
        items: data.items.map((item) => ({
          id: item.id,
          name: item.productName,
          qty: item.quantity,
          image: item.productImage, // Añadimos la imagen para mostrarla en el detalle
          price: parseFloat(item.unitPrice), // Convertimos el precio unitario a número
        })),
        createdAt: data.createdAt,
      };
    } catch (err) {
      console.error("Get order detail error:", err);
      return null;
    }
  }

  // Cancelar una orden
  async function cancelOrder(orderId) {
    if (!user || !token) {
      return { success: false, error: "No hay usuario logueado" };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Error al cancelar orden" };
      }

      return { success: true };
    } catch (err) {
      console.error("Cancel order error:", err);
      return { success: false, error: "Error de conexión" };
    }
  }

  const value = {
    user,
    loading,
    token,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    recoverPassword,
    resetPassword,
    getUserOrders,
    getOrderDetail,
    cancelOrder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
