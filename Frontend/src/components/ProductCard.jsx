import React, { useState } from 'react';

export default function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);
  const [zoomQR, setZoomQR] = useState(false);

  const waLink = 'https://wa.me/6287839792002';
  const imageUrl = product.imageUrl
    ? `http://localhost:5000${product.imageUrl}`
    : '/mnt/data/F69 Beli.png';

  return (
    <>
      {/* --- CARD PRODUK --- */}
      <div
        className="card"
        style={{
          background: "#282828ff",         // abu gelap
          borderRadius: "12px",
          padding: "20px",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          boxShadow: "0 0 0 rgba(214,191,89,0)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(0.96)";
          e.currentTarget.style.boxShadow = "0 0 15px rgba(214,191,89,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 0 0 rgba(214,191,89,0)";
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <img className="product-image" src={imageUrl} alt={product.name} />
        </div>

        <h3 style={{ textAlign: 'center', color: '#fff' }}>{product.name}</h3>

        <p style={{ color: '#bdbdbd', textAlign: 'center' }}>
          {product.shortDesc}
        </p>

        <h4 style={{ textAlign: 'center', color: '#d6bf59' }}>
          Rp {product.price?.toLocaleString()}
        </h4>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <button className="btn" onClick={() => setShowModal(true)}>
            Beli <i className="fas fa-shopping-cart"></i>
          </button>
        </div>
      </div>

      {/* --- MODAL PEMBAYARAN --- */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              style={{
                float: 'right',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: 20,
                cursor: "pointer"
              }}
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h3 style={{ color: '#d6bf59', marginLeft: '30px' }}>Pembayaran</h3>
            <h2>{product.name}</h2>
            <h3 style={{ color: '#d6bf59' }}>
              Rp {product.price?.toLocaleString()}
            </h3>

            <div style={{ margin: '18px 0' }}>
              {/* QR - dapat di-zoom */}
              <img
                src="http://localhost:5000/uploads/qr.jpg"
                alt="qr"
                onClick={() => setZoomQR(true)}
                style={{
                  width: 200,
                  borderRadius: 12,
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              />
            </div>

            <p className="small">Sudah membayar? Kirim bukti transfer ke WhatsApp</p>
            <a href={waLink} target="_blank" rel="noreferrer">
              <button className="btn" style={{ background: '#2ecc71', color: '#fff' }}>
                Chat Sekarang
              </button>
            </a>
          </div>
        </div>
      )}

      {/* --- ZOOM QR MODAL --- */}
      {zoomQR && (
        <div
          onClick={() => setZoomQR(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "zoom-out",
          }}
        >
          <img
            src="http://localhost:5000/uploads/qr.jpg"
            style={{
              width: "70%",
              maxWidth: "500px",
              borderRadius: "20px",
              boxShadow: "0 0 20px rgba(255,255,255,0.3)",
              animation: "zoomIn 0.25s ease",
            }}
          />
        </div>
      )}
    </>
  );
}
