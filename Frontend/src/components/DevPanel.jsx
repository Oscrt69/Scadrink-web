import React, { useEffect, useState } from "react";

export default function DevPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    shortDesc: "",
    image: null,
  });

  const [editData, setEditData] = useState(null); // ← data produk yang sedang diedit
  const [search, setSearch] = useState(""); // ← fitur pencarian
const [reviews, setReviews] = useState([]);

  const apiBase = "http://localhost:5000/api/products";

  const styles = {
    containerWrapper: {
      maxWidth: "900px",
      margin: "0 auto",
      padding: "20px",
    },
    primaryButton: {
      background: "#2ecc71",
      color: "white",
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1em",
    },
    deleteButton: {
      background: "#e74c3c",
      color: "white",
      padding: "10px 18px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: "1em",
    },
    inputStyle: {
      padding: "10px",
      borderRadius: "4px",
      border: "1px solid #333",
      background: "#222",
      color: "white",
      flex: 1,
    },
  };

  const fetchProducts = async () => {
    const res = await fetch(apiBase);
    setProducts(await res.json());
  };

  const fetchReviews = async () => {
  const res = await fetch("http://localhost:5000/api/reviews");
  setReviews(await res.json());
};


  useEffect(() => {
    fetchProducts();
    fetchReviews();
  }, []);

  const handleFile = (e) => setForm({ ...form, image: e.target.files[0] });

  // ADD Produk
  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("shortDesc", form.shortDesc);
    if (form.image) fd.append("image", form.image);

    const res = await fetch(apiBase, {
      method: "POST",
      body: fd,
    });

    if (res.ok) {
      setForm({ name: "", price: "", shortDesc: "", image: null });
      fetchProducts();
    } else {
      alert("Gagal menambah produk.");
    }
  };

  // DELETE Produk
  const remove = async (id) => {
    if (!confirm("Hapus produk?")) return;

    await fetch(apiBase + "/" + id, {
      method: "DELETE",
    });

    fetchProducts();
  };

  // EDIT Produk (send PUT)
  const saveEdit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", editData.name);
    fd.append("price", editData.price);
    fd.append("shortDesc", editData.shortDesc);
    if (editData.image) fd.append("image", editData.image);

    const res = await fetch(apiBase + "/" + editData._id, {
      method: "PUT",
      body: fd,
    });

    if (res.ok) {
      setEditData(null);
      fetchProducts();
    } else {
      alert("Gagal mengedit produk.");
    }
  };

  // FILTER SEARCH
  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.price.toString().includes(q)
    );
  });

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("devtoken");
    sessionStorage.removeItem("route")
    alert("Berhasil logout");
    window.location.reload();
  };

const removeReview = async (id) => {
  if (!confirm("Hapus review ini?")) return;

  await fetch("http://localhost:5000/api/reviews/" + id, {
    method: "DELETE",
  });

  fetchReviews();
};


  return (
    <div style={styles.containerWrapper}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #333",
          paddingBottom: "10px",
        }}
      >
        <h1>Developer Panel</h1>

        <button
            style={{
            background: "#c0392b", 
            padding: "1px 18px",  
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            fontWeight: "600",
            fontSize: "0.9em",
          }}
           onClick={handleLogout}
        >
      Logout
        </button>
      </div>

      {/* Search bar */}
      <div style={{ margin: "20px 0" }}>
        <input
          type="text"
          placeholder="Cari nama / harga / deskripsi..."
          style={{
            ...styles.inputStyle,
            width: "100%",
            padding: "12px",
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Form Tambah Produk */}
      <form onSubmit={submit}>
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <input
            placeholder="Nama produk"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={styles.inputStyle}
            required
          />
          <input
            placeholder="Harga"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            style={styles.inputStyle}
            required
          />
        </div>

        <textarea
          placeholder="Deskripsi singkat"
          rows={2}
          style={{ ...styles.inputStyle, width: "100%" }}
          value={form.shortDesc}
          onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
        ></textarea>

        <div
          style={{
            display: "flex",
            marginTop: "10px",
            justifyContent: "space-between",
          }}
        >
          <input type="file" accept="image/*" onChange={handleFile} />
          <button style={styles.primaryButton}>Tambah Produk</button>
        </div>
      </form>

      {/* LIST PRODUK + Edit */}
      <h3 style={{ marginTop: "40px" }}>Daftar Produk</h3>

      {filteredProducts.map((p) => (
        <div
          key={p._id}
          style={{
            display: "flex",
            gap: "12px",
            background: "#111",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "12px",
            alignItems: "center",
          }}
        >
          <img
            src={
              p.imageUrl
                ? `http://localhost:5000${p.imageUrl}`
                : "https://via.placeholder.com/80"
            }
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "700", fontSize: "1.1em" }}>
              {p.name}
            </div>
            <div style={{ fontSize: ".85em", color: "#ccc" }}>
              Rp {p.price?.toLocaleString()}
            </div>
            <div style={{ fontSize: ".75em", color: "#aaa" }}>
              {p.shortDesc}
            </div>
          </div>

          <button
            style={{
              background: "#ecae3aff",
              color: "white",
              padding: "8px 15px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer",
              fontWeight: "600",
              marginRight: "8px",
            }}
            onClick={() => setEditData(p)}
          >
            Edit
          </button>

          <button
            style={styles.deleteButton}
            onClick={() => remove(p._id)}
          >
            Hapus
          </button>
        </div>
      ))}


    <h3 style={{ marginTop: "40px" }}>Daftar Review</h3>

{reviews && reviews.length === 0 && (
  <p style={{ color: "#bbb" }}>Belum ada review.</p>
)}

{reviews &&
  reviews.map((rv) => (
    <div
      key={rv._id}
      style={{
        background: "#111",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "12px",
        border: "2px solid #333",
      }}
    >
      <div style={{ fontWeight: "700", color: "#d6bf59" }}>
        {rv.username} — {"★".repeat(rv.rating)}
      </div>

      <p style={{ marginTop: "5px", color: "#ddd" }}>
        "{rv.comment}"
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "15px", marginTop: "10px" }}>
  {rv.imageUrl && (
    <img
      src={`http://localhost:5000${rv.imageUrl}`}
      style={{
        width: "120px",
        borderRadius: "8px",
      }}
    />
  )}

  <button
    style={{
      ...styles.deleteButton,
      padding: "6px 14px",
      height: "40px"
    }}
    onClick={() => removeReview(rv._id)}
  >
    Hapus Review
  </button>
</div>

    </div>
  ))}

      {/* EDIT MODAL */}
      {editData && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <form
            onSubmit={saveEdit}
            style={{
              background: "#1b1b1b",
              padding: "30px",
              borderRadius: "10px",
              width: "400px",
            }}
          >
            <h3>Edit Produk</h3>

            <input
              type="text"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              style={{ ...styles.inputStyle, width: "100%", marginTop: "10px" }}
              placeholder="Nama produk"
            />

            <input
              type="number"
              value={editData.price}
              onChange={(e) =>
                setEditData({ ...editData, price: e.target.value })
              }
              style={{ ...styles.inputStyle, width: "100%", marginTop: "10px" }}
              placeholder="Harga"
            />

            <textarea
              value={editData.shortDesc}
              onChange={(e) =>
                setEditData({ ...editData, shortDesc: e.target.value })
              }
              rows={3}
              style={{ ...styles.inputStyle, width: "100%", marginTop: "10px" }}
            ></textarea>

            <div style={{ marginTop: "10px" }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setEditData({ ...editData, image: e.target.files[0] })
                }
              />
            </div>

            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <button
                type="button"
                style={styles.deleteButton}
                onClick={() => setEditData(null)}
              >
                Batal
              </button>

              <button type="submit" style={styles.primaryButton}>
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
