import React, { useEffect, useState } from "react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Cargar usuarios del localStorage al iniciar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsers(stored);
  }, []);

  // Guardar cambios en localStorage
  const updateLocalStorage = (updatedUsers) => {
    localStorage.setItem("usuarios", JSON.stringify(updatedUsers));
  };

  // Activar o desactivar usuario
  const toggleActive = (id) => {
    const updatedUsers = users.map((u) =>
      u.id === id ? { ...u, active: !u.active } : u
    );
    setUsers(updatedUsers);
    updateLocalStorage(updatedUsers);
  };

  // Filtrar usuarios por búsqueda
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const nextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestión de Usuarios</h1>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar por nombre o email..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          padding: "8px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px",
        }}
      />

      {/* Tabla */}
      {currentUsers.length === 0 ? (
        <p>No se encontraron usuarios.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead style={{ background: "#f4f4f4" }}>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.lastName}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    style={{
                      color: u.active ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {u.active ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => toggleActive(u.id)}
                    style={{
                      marginRight: "0.5rem",
                      background: u.active ? "#f44336" : "#4CAF50",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    {u.active ? "Desactivar" : "Activar"}
                  </button>
                  <button
                    onClick={() => setSelectedUser(u)}
                    style={{
                      background: "#2196F3",
                      color: "#fff",
                      border: "none",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Paginación */}
      {filteredUsers.length > usersPerPage && (
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button onClick={prevPage} disabled={currentPage === 1}>
            ◀ Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Siguiente ▶
          </button>
        </div>
      )}

      {/* Modal Detalle */}
      {selectedUser && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setSelectedUser(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "2rem",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            }}
          >
            <h3>Detalle del Usuario</h3>
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Nombre:</strong> {selectedUser.name}</p>
            <p><strong>Apellido:</strong> {selectedUser.lastName}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p>
              <strong>Estado:</strong>{" "}
              {selectedUser.active ? "Activo ✅" : "Inactivo ❌"}
            </p>
            <button
              onClick={() => setSelectedUser(null)}
              style={{
                marginTop: "1rem",
                padding: "8px 16px",
                border: "none",
                background: "#333",
                color: "#fff",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
