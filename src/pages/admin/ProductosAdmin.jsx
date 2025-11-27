import React, { useState } from "react";

export default function ProductosAdmin({
  productList,
  setProductList,
  toggleActive,
}) {
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
    category: "",
    price: "",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
  });

  // ---------------- AGREGAR PRODUCTO ----------------
  const handleAddProduct = (e) => {
    e.preventDefault();

    const newItem = {
      id: productList.length
        ? Math.max(...productList.map((p) => p.id)) + 1
        : 1,
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      active: true,
    };

    setProductList([...productList, newItem]);
    setShowAddModal(false);

    setNewProduct({ name: "", category: "", price: "" });
  };

  // ---------------- EDITAR PRODUCTO ----------------
  const openEditModal = (product) => {
    setEditData(product);
    setShowEditModal(true);
  };

  const handleEditProduct = (e) => {
    e.preventDefault();

    setProductList(
      productList.map((p) =>
        p.id === editData.id
          ? {
              ...p,
              name: editData.name,
              category: editData.category,
              price: Number(editData.price),
            }
          : p
      )
    );

    setShowEditModal(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestión de Productos</h1>

      <button
        onClick={() => setShowAddModal(true)}
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

      {/* -------- TABLA -------- */}
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
          {currentProducts.map((p) => (
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
                  onClick={() => openEditModal(p)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* -------- PAGINACIÓN -------- */}
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

      {/* -------- MODAL AGREGAR -------- */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agregar Producto</h3>
            <form onSubmit={handleAddProduct}>
              <input
                type="text"
                placeholder="Nombre"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Categoría"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Precio"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                required
              />

              <button type="submit">Guardar</button>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                style={{ marginLeft: "1rem" }}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* -------- MODAL EDITAR -------- */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Producto</h3>
            <form onSubmit={handleEditProduct}>
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                value={editData.category}
                onChange={(e) =>
                  setEditData({ ...editData, category: e.target.value })
                }
                required
              />
              <input
                type="number"
                value={editData.price}
                onChange={(e) =>
                  setEditData({ ...editData, price: e.target.value })
                }
                required
              />

              <button type="submit">Guardar Cambios</button>
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                style={{ marginLeft: "1rem" }}
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* -------- ESTILOS DE MODAL -------- */}
      <style>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          min-width: 300px;
        }
        input {
          display: block;
          width: 100%;
          margin-bottom: 1rem;
          padding: 8px;
        }
      `}</style>
    </div>
  );
}
