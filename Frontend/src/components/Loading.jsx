import React from "react";

export default function Loading() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "#000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 99999
    }}>
      
      {/* WRAPPER */}
      <div style={{ position: "relative", width: "120px", height: "120px" }}>
        
        {/* LINGKARAN PUTIH */}
        <div style={{
          position: "absolute",
          width: "100px",
          height: "100px",
          border: "6px solid transparent",
          borderTop: "6px solid white",
          borderRight: "6px solid white",
          borderRadius: "50%",
          animation: "spinReverse 1s linear infinite",
          top: "10px",
          left: "10px"
        }} />
        
        {/* LINGKARAN KUNING */}
        <div style={{
          position: "absolute",
          width: "120px",
          height: "120px",
          border: "6px solid transparent",
          borderBottom: "6px solid #d6bf59",
          borderLeft: "6px solid #d6bf59",
          borderRadius: "50%",
          animation: "spin 1.3s linear infinite",
        }} />

      </div>

      {/* Animasi CSS global */}
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes spinReverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
}
