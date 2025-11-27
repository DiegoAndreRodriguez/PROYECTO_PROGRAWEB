import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Se asegura de usar la URL configurada o localhost por defecto
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const storedUser = localStorage.getItem("user_session");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user session");
      }
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    try {
      // 👇 AQUÍ ESTABA EL DETALLE: Debe decir /api/auth/login
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Error al iniciar sesión" };
      }

      setUser(data);
      localStorage.setItem("user_session", JSON.stringify(data));
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: "Error de conexión con el servidor" };
    }
  }

  async function register(name, lastName, email, password) {
    try {

      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.error || "Error en el registro" };
      }

      setUser(data);
      localStorage.setItem("user_session", JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { success: false, error: "Error de conexión" };
    }
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("user_session");
  }

  // Funciones dummy para que no falle el perfil
  async function updateProfile(name, lastName, email) { return { success: true }; }
  async function changePassword(c, n) { return { success: true }; }
  function recoverPassword(email) { return { success: true }; }
  function getUserOrders() { return []; }

  const value = {
    user, loading, login, register, logout,
    updateProfile, changePassword, recoverPassword, getUserOrders,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}