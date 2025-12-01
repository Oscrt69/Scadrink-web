import React, { useState } from "react";

export default function LoginUser({ onSuccess, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      onSuccess();
    } else {
      alert(data.message);
    }
  };

  return (
    // Di komponen React Anda (misalnya jika route === "loginUser")

<div style={{
    // Styling untuk login-box (menggantikan .login-box)
    maxWidth: '400px',
    margin: '100px auto', // Atur margin top agar berada di tengah layar vertikal
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
        Login User
    </h2>

    {/* Form Login */}
    <form onSubmit={login} style={{ marginBottom: '20px' }}>
        
        {/* Input Email */}
        <div style={{ marginBottom: '15px' }}>
            <input 
                type="email" 
                placeholder="Email"
                style={{
                    // Styling untuk input-field (menggantikan .input-field)
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #333',
                    color: '#ffffff',
                    borderRadius: '4px',
                    boxSizing: 'border-box' // Penting untuk padding
                }}
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
            />
        </div>

        {/* Input Password */}
        <div style={{ marginBottom: '25px' }}>
            <input 
                type="password" 
                placeholder="Password"
                style={{
                    // Styling untuk input-field
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #333',
                    color: '#ffffff',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                }}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
            />
        </div>

        {/* Tombol Login */}
        {/* Catatan: className="btn" tetap dipertahankan jika Anda ingin menggunakan style button dari styles.css */}
        <button type="submit" className="btn" style={{ 
            width: '100%',
            fontWeight: '700'
        }}>
            Login
        </button>
    </form>

    {/* Link Register */}
    <p style={{ 
        color: '#ffffff', 
        fontSize: '0.95em',
        margin: '0' 
    }}>
        Belum punya akun? 
        <span 
            onClick={goRegister} 
            style={{ 
                color: '#d6bf59', // Warna link kuning emas
                cursor: 'pointer',
                marginLeft: '5px',
                fontWeight: '600',
                textDecoration: 'none' // Pastikan tidak ada underline default
            }}
        >
            Register
        </span>
    </p>
</div>
  );
}
