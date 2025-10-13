import React, { useState } from "react";

export default function ProductosAdmin({
  productList,
  setProductList,
  toggleActive,
}) {
  // Editar producto
  const handleEdit = (product) => {
    const newName = prompt("Editar nombre del producto:", product.name);
    if (newName === null) return;
    const newCategory = prompt("Editar categoría:", product.category);
    if (newCategory === null) return;
    const newPrice = prompt("Editar precio:", product.price);
    if (newPrice === null) return;

    // Actualizar el estado
    setProductList(
      productList.map((p) =>
        p.id === product.id
          ? {
              ...p,
              name: newName,
              category: newCategory,
              price: Number(newPrice),
            }
          : p
      )
    );
  };

  // Agregar producto
  const handleAdd = () => {
    const name = prompt("Nombre del producto:");
    if (!name) return;
    const category = prompt("Categoría:");
    if (!category) return;
    const price = prompt("Precio:");
    if (!price) return;

    const newProduct = {
      id: productList.length
        ? Math.max(...productList.map((p) => p.id)) + 1
        : 1,
      name,
      category,
      price: Number(price),
      active: true,
    };

    setProductList([...productList, newProduct]);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestión de Productos</h1>

      <button
        onClick={handleAdd}
        style={{
          padding: "6px 12px",
          marginBottom: "10px",
          cursor: "pointer",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#555",
          color: "white",
        }}
      >
        + Agregar Producto
      </button>

      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.active ? "Sí" : "No"}</td>
              <td>
                <button onClick={() => toggleActive(p.id)}>
                  {p.active ? "Desactivar" : "Activar"}
                </button>
                <button
                  style={{ marginLeft: "0.5rem" }}
                  onClick={() => handleEdit(p)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
