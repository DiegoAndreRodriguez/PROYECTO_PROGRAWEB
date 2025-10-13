import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Exportar el contexto para usarlo en useAuth
export { AuthContext };

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login
  function login(email, password) {
    // --- ADMIN FIJO ---
    if (email === "admin@gmail.com" && password === "admin123") {
      const adminUser = {
        email,
        name: "Administrador",
        role: "admin",
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return { success: true };
    }
    // --- USUARIO NORMAL --
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        lastName: foundUser.lastName,
        email: foundUser.email,
        role: "user",
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      return { success: true };
    }
    return { success: false, error: "Credenciales incorrectas" };
  }

  // Registro
  function register(name, lastName, email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Verificar si el email ya existe
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "El email ya está registrado" };
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      lastName,
      email,
      password, // En producción, esto debería estar hasheado
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto-login después del registro
    const userData = {
      id: newUser.id,
      name: newUser.name,
      lastName: newUser.lastName,
      email: newUser.email,
      role: "user",
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    return { success: true };
  }

  // Logout
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  // Actualizar perfil
  function updateProfile(name, lastName, email) {
    if (!user) return { success: false, error: "No hay usuario logueado" };

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex === -1) {
      return { success: false, error: "Usuario no encontrado" };
    }

    // Verificar si el nuevo email ya existe (pero no es el actual)
    if (email !== user.email && users.find((u) => u.email === email)) {
      return { success: false, error: "El email ya está registrado" };
    }

    users[userIndex] = { ...users[userIndex], name, lastName, email };
    localStorage.setItem("users", JSON.stringify(users));

    const updatedUser = {
      id: user.id,
      name,
      lastName,
      email,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    return { success: true };
  }

  // Cambiar contraseña
  function changePassword(currentPassword, newPassword) {
    if (!user) return { success: false, error: "No hay usuario logueado" };

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex((u) => u.id === user.id);

    if (userIndex === -1) {
      return { success: false, error: "Usuario no encontrado" };
    }

    if (users[userIndex].password !== currentPassword) {
      return { success: false, error: "Contraseña actual incorrecta" };
    }

    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  }

  // Recuperar contraseña (simulado)
  function recoverPassword(email) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const foundUser = users.find((u) => u.email === email);

    if (foundUser) {
      // En un caso real, aquí se envía un email
      console.log(`Email de recuperación enviado a: ${email}`);
      console.log(`Contraseña: ${foundUser.password}`); // Solo para demo
      return { success: true };
    }
    return { success: false, error: "Email no encontrado" };
  }

  // Obtener órdenes del usuario
  function getUserOrders() {
    if (!user) return [];
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    return orders.filter((order) => order.userId === user.id);
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    recoverPassword,
    getUserOrders,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
