import React, { useState, useEffect } from "react";

export default function ProductosAdmin({ productList, setProductList }) {
  const API_URL = "http://localhost:3000/api/products";

  // ---------------- CARGAR PRODUCTOS ----------------
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setProductList(data))
      .catch((err) => console.error("Error cargando productos", err));
  }, []);

  // ---------------- PAGINACIÓN ----------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(productList.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentProducts = productList.slice(indexOfFirst, indexOfLast);

  // ---------------- MODALES ----------------
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editData, setEditData] = useState({
    id: null,
    name: "",
    price: 0,
    stock: 0,
    is_active: true,
  });

  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    is_active: true,
  });

  const [addError, setAddError] = useState("");

  // ---------------- ABRIR MODAL AGREGAR ----------------
  const openAddModal = () => {
    const lastId = productList.length
      ? Math.max(...productList.map((p) => p.id))
      : 0;

    setNewProduct({
      id: lastId + 1,
      name: "",
      price: 0,
      stock: 0,
      is_active: true,
    });
    setAddError("");
    setShowAddModal(true);
  };

  // ---------------- AGREGAR PRODUCTO ----------------
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddError("");

    if (newProduct.price < 0 || newProduct.stock < 0) {
      setAddError("Precio y Stock no pueden ser negativos");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Error en la creación del producto");

      const created = await response.json();
      setProductList([...productList, created]);
      setShowAddModal(false);

      setNewProduct({
        id: 0,
        name: "",
        price: 0,
        stock: 0,
        is_active: true,
      });
    } catch (error) {
      console.error("Error creando producto:", error);
      setAddError("No se pudo crear el producto. Revisa la consola.");
    }
  };

  // ---------------- ABRIR MODAL EDITAR ----------------
  const openEditModal = (product) => {
    setEditData(product);
    setShowEditModal(true);
  };

  // ---------------- EDITAR PRODUCTO ----------------
  const handleEditProduct = async (e) => {
    e.preventDefault();

    if (editData.price < 0 || editData.stock < 0) {
      alert("Precio y Stock no pueden ser negativos");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      const updated = await response.json();
      setProductList(
        productList.map((p) => (p.id === updated.id ? updated : p))
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Error editando producto:", error);
    }
  };

  // ---------------- ACTIVAR / DESACTIVAR PRODUCTO ----------------
  const toggleActiveBackend = async (id) => {
    const product = productList.find((p) => p.id === id);
    if (!product) return;

    try {
      const updated = { ...product, is_active: !product.is_active };
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      const updatedProd = await response.json();
      setProductList(productList.map((p) => (p.id === id ? updatedProd : p)));
    } catch (error) {
      console.error("Error activando/desactivando:", error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestión de Productos</h1>

      <button
        onClick={openAddModal}
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

      {/* ---------------- MODAL AGREGAR PRODUCTO ---------------- */}
      {showAddModal && (
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
            onSubmit={handleAddProduct}
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
            <h2>Agregar Producto</h2>

            <label>
              ID (automático, no editable):
              <input
                type="number"
                value={newProduct.id}
                readOnly
                style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
              />
            </label>

            <label>
              Nombre:
              <input
                type="text"
                placeholder="Nombre del producto"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
                style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
              />
            </label>

            <label>
              Precio:
              <input
                type="number"
                min={0}
                placeholder="Precio del producto"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: Math.max(0, Number(e.target.value)),
                  })
                }
                required
                style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
              />
            </label>

            <label>
              Stock:
              <input
                type="number"
                min={0}
                placeholder="Cantidad en stock"
                value={newProduct.stock}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: Math.max(0, Number(e.target.value)),
                  })
                }
                required
                style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
              />
            </label>

            {addError && <p style={{ color: "red" }}>{addError}</p>}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button
                type="submit"
                style={{ padding: "8px 16px", cursor: "pointer" }}
              >
                Crear Producto
              </button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{ padding: "8px 16px", cursor: "pointer" }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- MODAL EDITAR PRODUCTO ---------------- */}
      {showEditModal && (
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
            onSubmit={handleEditProduct}
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
            <h2>Editar Producto</h2>

            <label>
              ID:
              <input
                type="number"
                value={editData.id}
                readOnly
                style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
              />
            </label>

            <label>
              Nombre:
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                required
                style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
              />
            </label>

            <label>
              Precio:
              <input
                type="number"
                min={0}
                value={editData.price}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    price: Math.max(0, Number(e.target.value)),
                  })
                }
                required
                style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
              />
            </label>

            <label>
              Stock:
              <input
                type="number"
                min={0}
                value={editData.stock}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    stock: Math.max(0, Number(e.target.value)),
                  })
                }
                required
                style={{ width: "100%", padding: "8px", fontSize: "1rem" }}
              />
            </label>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button
                type="submit"
                style={{ padding: "8px 16px", cursor: "pointer" }}
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                style={{ padding: "8px 16px", cursor: "pointer" }}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ---------------- TABLA DE PRODUCTOS ---------------- */}
      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{ width: "100%", marginTop: "1rem" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {currentProducts.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>{p.is_active ? "Sí" : "No"}</td>
              <td>
                <button onClick={() => toggleActiveBackend(p.id)}>
                  {p.is_active ? "Desactivar" : "Activar"}
                </button>
                <button
                  style={{ marginLeft: "0.5rem" }}
                  onClick={() => openEditModal(p)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------------- PAGINACIÓN ---------------- */}
      <div style={{ marginTop: "1rem", textAlign: "center" }}>
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          style={{ marginRight: "10px" }}
        >
          ◀ Anterior
        </button>

        <strong>
          Página {currentPage} de {totalPages}
        </strong>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          style={{ marginLeft: "10px" }}
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
}
