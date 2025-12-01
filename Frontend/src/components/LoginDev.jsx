import React, { useState } from "react";

export default function LoginDev({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Untuk menampilkan pesan error

  const loginDev = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Bersihkan pesan error sebelumnya

    try {
      const res = await fetch("http://localhost:5000/api/auth/devlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("devtoken", data.token);
        onSuccess();
      } else {
        // Tampilkan pesan error di bawah form
        setErrorMessage(data.message || "Login gagal, coba lagi.");
      }
    } catch (error) {
        setErrorMessage("Koneksi gagal atau server tidak merespons.");
    }
  };

  return (
    <div style={{
        // Styling untuk container utama (mirip .login-box)
        maxWidth: '400px',
        margin: '100px auto', // Tengah secara vertikal dan horizontal
        padding: '40px',
        backgroundColor: '#1a1a1a', // Latar belakang gelap
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        color: '#ffffff' // Teks putih default
    }}>
      
      {/* Judul Halaman */}
      <h2 style={{ 
          color: '#d6bf59', // Warna kuning emas
          marginBottom: '30px' 
      }}>
          Developer Login
      </h2>

      {/* Pesan Error (jika ada) */}
      {errorMessage && (
        <p style={{ color: '#ff6b6b', marginBottom: '15px' }}>
            {errorMessage}
        </p>
      )}

      {/* Form Login */}
<form onSubmit={loginDev}>

  {/* Input Username */}
  <div style={{ marginBottom: '15px' }}>
    <input 
      type="text" 
      placeholder="Username"
      style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#2a2a2a',
          border: '1px solid #333',
          color: '#ffffff',
          borderRadius: '4px',
          boxSizing: 'border-box'
      }}
      value={username} 
      onChange={(e)=>setUsername(e.target.value)} 
      required
    />
  </div>

  {/* Input Password */}
  <div style={{ marginBottom: '25px' }}>
    <input 
      type="password" 
      placeholder="Password"
      style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#2a2a2a',
          border: '1px solid #333',
          color: '#ffffff',
          borderRadius: '4px',
          boxSizing: 'border-box'
      }}
      value={password} 
      onChange={(e)=>setPassword(e.target.value)} 
      required
    />
  </div>

  {/* Tombol Kembali */}
  <button
    type="button"
    onClick={() => window.location.reload()}
    style={{
      width: "100%",
      padding: "10px",
      backgroundColor: "#444",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginBottom: "15px"
    }}
  >
    Kembali
  </button>

  {/* Tombol Login */}
  <button type="submit" className="btn" style={{ width: '100%' }}>
    Login Developer
  </button>
</form>

    </div>
  );
}

