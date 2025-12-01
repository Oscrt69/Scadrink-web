import React, { useEffect, useState } from "react";

export default function Review() {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [image, setImage] = useState(null);

  const apiBase = "http://localhost:5000/api/reviews";
  const username = localStorage.getItem("username");

  const fetchReviews = async () => {
    const res = await fetch(apiBase);
    setReviews(await res.json());
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("username", username);
    fd.append("comment", comment);
    fd.append("rating", rating);
    if (image) fd.append("image", image);

    const res = await fetch(apiBase, {
      method: "POST",
      body: fd,
    });

    if (res.ok) {
      setComment("");
      setRating(5);
      setImage(null);
      fetchReviews();
    } else {
      alert("Gagal mengirim review");
    }
  };

  return (
    <section id="review" style={{ padding: "60px 20px", textAlign: "center" }}>
      <h2 style={{ color: "#d6bf59", fontSize: "40px" }}>Testimoni Pelanggan</h2>
      <p style={{ color: "#bdbdbd" }}>Apa kata mereka tentang Scadrink</p>

      {/* LIST GRID */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "40px",
        }}
      >
        {reviews.map((r) => (
          <div
            key={r._id}
            style={{
              background: "#111",
              padding: "15px",
              borderRadius: "12px",
              width: "450px",

              display: "flex",         // <-- FLEX ROW
              alignItems: "flex-start",
              gap: "15px",

              border: "2px solid #d6bf59",
              transition: "0.3s",
              boxShadow: "0 0 0px rgba(214,191,89,0.0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 15px rgba(214,191,89,0.7)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 0 0px rgba(214,191,89,0.0)";
            }}
          >
            {/* GAMBAR REVIEW (JIKA ADA) */}
            {r.imageUrl && (
              <img
                src={`http://localhost:5000${r.imageUrl}`}
                alt="review"
                style={{
                  width: "110px",
                  height: "110px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  flexShrink: 0,
                }}
              />
            )}

            {/* ISI REVIEW */}
            <div style={{ flex: 1, textAlign: "left" }}>
              {/* RATING */}
              <div style={{ color: "#d6bf59", fontSize: "20px" }}>
                {"★".repeat(r.rating)}
                <span style={{ color: "#555" }}>
                  {"★".repeat(5 - r.rating)}
                </span>
              </div>

              <p style={{ fontStyle: "italic", marginTop: "8px", color: "#eee" }}>
                "{r.comment}"
              </p>

              <div style={{ marginTop: "10px", fontWeight: "700" }}>
                {r.username}
              </div>
            </div>

            {/* TOMBOL HAPUS REVIEW */}
            <button
              onClick={async () => {
                if (!confirm("Hapus review ini?")) return;
                await fetch(`${apiBase}/${r._id}`, { method: "DELETE" });
                fetchReviews();
              }}
              style={{
                background: "#c0392b",
                border: "none",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "600",
                height: "fit-content",
                whiteSpace: "nowrap",
              }}
            >
              Hapus
            </button>
          </div>
        ))}
      </div>

      {/* FORM REVIEW */}
      <form
        onSubmit={submitReview}
        style={{
          marginTop: "50px",
          background: "#1a1a1a",
          padding: "20px",
          borderRadius: "12px",
          maxWidth: "500px",
          marginInline: "auto",
          textAlign: "left",
          border: "1px solid #333",
        }}
      >
        <h3 style={{ color: "#d6bf59" }}>Tulis Review Anda</h3>

        <textarea
          placeholder="Komentar anda"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            background: "#222",
            color: "#fff",
            borderRadius: "6px",
            border: "1px solid #333",
          }}
        />

        <h3 style={{ color: "#d6bf59" }}>Rating</h3>

        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "10px",
            background: "#222",
            color: "#fff",
            borderRadius: "6px",
            border: "1px solid #333",
          }}
        >
          {[5, 4, 3, 2, 1].map((num) => (
            <option key={num} value={num}>
              {"⭐".repeat(num)}
            </option>
          ))}
        </select>

        <h3 style={{ color: "#d6bf59" }}>Foto (opsional)</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{
            marginTop: "10px",
            width: "100%",
            color: "#fff",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: "15px",
            padding: "10px 20px",
            width: "100%",
            background: "#d6bf59",
            color: "#000",
            borderRadius: "8px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          Kirim Review
        </button>
      </form>
    </section>
  );
}
