import React, { useState } from "react";

export default function CategoriasAdmin({
  categoryList,
  setCategoryList,
  productList,
}) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    products: [],
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleEdit = (cat) => {
    setEditingCategory({ ...cat });
  };

  const handleSaveEdit = () => {
    setCategoryList((prev) =>
      prev.map((c) => (c.id === editingCategory.id ? editingCategory : c))
    );
    setEditingCategory(null);
  };

  const handleAddCategory = () => {
    // Validar que el nombre no esté vacío
    if (!newCategory.name.trim()) {
      alert("Por favor, ingresa un nombre para la categoría");
      return;
    }

    const nextId =
      categoryList.length > 0
        ? Math.max(...categoryList.map((c) => c.id)) + 1
        : 1;

    setCategoryList([...categoryList, { id: nextId, ...newCategory }]);
    setNewCategory({ name: "", products: [] });
  };

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

  const filteredProducts = productList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestión de Categorías</h1>

      {/* Lista de categorías */}
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

      {/* Agregar nueva categoría */}
      <h3 style={{ marginTop: "2rem" }}>Agregar Categoría</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={newCategory.name}
        onChange={(e) =>
          setNewCategory({ ...newCategory, name: e.target.value })
        }
      />
      <button style={{ marginLeft: "0.5rem" }} onClick={handleAddCategory}>
        Agregar Categoría
      </button>

      {/* Modal para seleccionar productos*/}
      {modalOpen && (
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
        >
          <div
            style={{
              background: "#fff",
              padding: "2rem",
              width: "500px",
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <h3>Seleccionar Productos</h3>
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              {filteredProducts.map((p) => (
                <button
                  key={p.id}
                  style={{
                    background: newCategory.products.includes(p.id)
                      ? "#82ca9d"
                      : "#eee",
                  }}
                  onClick={() => toggleProductInCategory(p.id)}
                >
                  {p.name}
                </button>
              ))}
            </div>
            <button
              style={{ marginTop: "1rem" }}
              onClick={() => setModalOpen(false)}
            >
              Guardar Productos
            </button>
          </div>
        </div>
      )}

      {/* Editar categoría */}
      {editingCategory && (
        <div
          style={{
            marginTop: "2rem",
            border: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          <h3>Editar Categoría: {editingCategory.name}</h3>
          <label style={{ marginRight: "0.5rem" }}>Nombre:</label>
          <input
            type="text"
            value={editingCategory.name}
            onChange={(e) =>
              setEditingCategory({ ...editingCategory, name: e.target.value })
            }
          />
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
