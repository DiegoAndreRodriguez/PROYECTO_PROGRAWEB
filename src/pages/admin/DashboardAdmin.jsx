import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const [salesData, setSalesData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    // Simulación de datos backend
    setOrders([
      { id: 101, user: "Juan Pérez", total: 120, date: "10-10-2025" },
      { id: 102, user: "Ana Gómez", total: 75, date: "10-10-2025" },
      { id: 103, user: "Luis Martínez", total: 200, date: "11-10-2025" },
    ]);
    setUsers([{ id: 1 }, { id: 2 }, { id: 3 }]);
    setTotalIncome(395);

    setSalesData([
      { day: "10 Oct", Ventas: 195 },
      { day: "11 Oct", Ventas: 200 },
      { day: "12 Oct", Ventas: 0 },
    ]);
    setUsersData([
      { day: "10 Oct", NuevosUsuarios: 2 },
      { day: "11 Oct", NuevosUsuarios: 1 },
      { day: "12 Oct", NuevosUsuarios: 0 },
    ]);
  }, [startDate, endDate]);

  const btnStyle = {
    padding: "10px 20px",
    marginRight: "10px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: "5px",
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Bienvenido, {user?.name}</h1>
      <h2>Dashboard del Administrador</h2>

      {/* Selector de fechas */}
      <div style={{ margin: "20px 0" }}>
        <label>
          Desde:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Hasta:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
      </div>

      {/* Resumen rápido */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            flex: 1,
            textAlign: "center",
          }}
        >
          <h3>Órdenes</h3>
          <p>{orders.length}</p>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            flex: 1,
            textAlign: "center",
          }}
        >
          <h3>Usuarios Nuevos</h3>
          <p>{users.length}</p>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            flex: 1,
            textAlign: "center",
          }}
        >
          <h3>Ingresos Totales</h3>
          <p>${totalIncome}</p>
        </div>
      </div>

      {/* Botones de gestión */}
      <div style={{ marginBottom: "30px" }}>
        <button style={btnStyle} onClick={() => navigate("/admin/productos")}>
          Gestión de Productos
        </button>
        <button style={btnStyle} onClick={() => navigate("/admin/categorias")}>
          Gestión de Categorías
        </button>
      </div>

      {/* Gráfica de ventas */}
      <h3>Ventas por día</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={salesData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Ventas" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Gráfica de nuevos usuarios */}
      <h3>Usuarios Nuevos por día</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={usersData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="NuevosUsuarios" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>

      {/* Últimas órdenes */}
      <h3>Últimas órdenes</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "10px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Usuario
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Total</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {o.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {o.user}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ${o.total}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {o.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
