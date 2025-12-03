import React, { useState, useEffect } from "react";

export default function CategoriasAdmin({ productList }) {
  const [categoryList, setCategoryList] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", products: [] });
  const [modalOpen, setModalOpen] = useState(false);

  // ------------------------------------------------------------
  // GET CATEGORIES (BACKEND)
  // ------------------------------------------------------------
  const loadCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();

      const formatted = data.map((c) => ({ ...c, products: c.products || [] }));
      setCategoryList(formatted);
    } catch (err) {
      console.error("Error al cargar categorías", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ------------------------------------------------------------
  // EDITAR CATEGORÍA
  // ------------------------------------------------------------
  const handleEdit = (cat) => {
    setEditingCategory({ ...cat });
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/categories/${editingCategory.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingCategory),
        }
      );

      if (!res.ok) return alert("Error al actualizar categoría");

      setCategoryList((prev) =>
        prev.map((c) => (c.id === editingCategory.id ? editingCategory : c))
      );
      setEditingCategory(null);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- AGREGAR CATEGORÍA ----------------
  const handleAddCategory = () => {
    if (!newCategory.name.trim()) {
      return alert("Ingresa un nombre para la categoría");
    }

    // Calculamos el nuevo ID sumando 1 al último ID de categoryList
    const lastId = categoryList.length
      ? Math.max(...categoryList.map((c) => c.id))
      : 0;

    const newCat = {
      id: lastId + 1, // Nuevo ID
      name: newCategory.name, // Nombre ingresado
      products: [...newCategory.products], // Productos seleccionados
    };

    // Insertamos inmediatamente en la tabla
    setCategoryList([...categoryList, newCat]);

    // Limpiamos formulario y cerramos modal
    setNewCategory({ name: "", products: [] });
    setModalOpen(false);
  };

  // ------------------------------------------------------------
  // TOGGLE PRODUCTOS
  // ------------------------------------------------------------
  const toggleProductInCategory = (productId, isEditing = false) => {
    if (isEditing) {
      const exists = editingCategory.products.includes(productId);
      setEditingCategory({
        ...editingCategory,
        products: exists
          ? editingCategory.products.filter((id) => id !== productId)
          : [...editingCategory.products, productId],
      });
    } else {
      const exists = newCategory.products.includes(productId);
      setNewCategory({
        ...newCategory,
        products: exists
          ? newCategory.products.filter((id) => id !== productId)
          : [...newCategory.products, productId],
      });
    }
  };

  // Lista de nombres para el toggle de edición (dinámica)
  const categoryNames = categoryList.map((c) => c.name);

  // ------------------------------------------------------------
  // RENDER
  // ------------------------------------------------------------
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestión de Categorías</h1>

      {/* ---------------- LISTA DE CATEGORÍAS ---------------- */}
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", marginTop: "1rem" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Productos Asociados</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>
                {cat.products
                  .map((pid) => productList.find((p) => p.id === pid)?.name)
                  .join(", ")}
              </td>
              <td>
                <button onClick={() => handleEdit(cat)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------------- AGREGAR NUEVA CATEGORÍA ---------------- */}
      <button
        style={{ marginTop: "1rem", padding: "6px 12px" }}
        onClick={() => setModalOpen(true)}
      >
        + Agregar Categoría
      </button>

      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddCategory();
            }}
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "8px",
              minWidth: "350px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h3>Agregar Categoría</h3>

            <label>
              Nombre:
              <input
                type="text"
                placeholder="Ingresa nombre de la categoría"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
                required
              />
            </label>

            <div>
              <strong>Productos Asociados:</strong>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginTop: "0.5rem",
                }}
              >
                {productList.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    style={{
                      background: newCategory.products.includes(p.id)
                        ? "#82ca9d"
                        : "#eee",
                      padding: "4px 8px",
                    }}
                    onClick={() => toggleProductInCategory(p.id, false)}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button type="submit" style={{ padding: "8px 16px" }}>
                Crear Categoría
              </button>
              <button
                type="button"
                style={{ padding: "8px 16px" }}
                onClick={() => setModalOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- EDITAR CATEGORÍA ---------------- */}
      {editingCategory && (
        <div
          style={{
            marginTop: "2rem",
            border: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          <h3>Editar Categoría</h3>
          <label>
            Selecciona Categoría:
            <select
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, name: e.target.value })
              }
            >
              {categoryNames.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          <div style={{ marginTop: "1rem" }}>
            <strong>Productos Asociados:</strong>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginTop: "0.5rem",
              }}
            >
              {productList.map((p) => (
                <button
                  key={p.id}
                  style={{
                    background: editingCategory.products.includes(p.id)
                      ? "#82ca9d"
                      : "#eee",
                    padding: "4px 8px",
                  }}
                  onClick={() => toggleProductInCategory(p.id, true)}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <button style={{ marginTop: "1rem" }} onClick={handleSaveEdit}>
            Guardar Cambios
          </button>
        </div>
      )}
    </div>
  );
}
