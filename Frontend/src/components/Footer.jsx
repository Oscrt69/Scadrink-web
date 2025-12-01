import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "30px 0 25px 0",
        marginTop: "60px",
        color: "#ccc",
        fontSize: "17px",
        // Menggunakan background solid gelap yang konsisten
        background: "#1a1a1a", 
        
        // --- PROPERTI INI DIHAPUS AGAR FOOTER TIDAK 'FIXED' (Selalu Terlihat) ---
        // position: "fixed", 
        // bottom: 0,
        // left: 0,
        // width: "100%",
        // zIndex: 50,
        // ---------------------------------------------------------------------
      }}
    >
      {/* COPYRIGHT */}
      <div style={{ opacity: 0.85 }}>
        © 2025 <span style={{ color: "#d6bf59" }}>Scadrink</span>. All rights reserved.
      </div>
    </footer>
  );
}