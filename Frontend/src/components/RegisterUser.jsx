import React, { useState } from "react";

export default function RegisterUser({ onDone, goLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();
    if (res.ok) {
      alert("Berhasil daftar!");
      onDone();
    } else {
      alert(data.message);
    }
  };

  return (
<div style={{
    maxWidth: '400px',
    margin: '100px auto',
    padding: '40px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
    textAlign: 'center',
    color: '#ffffff'
}}>
    <h2 style={{ color: '#d6bf59', marginBottom: '30px' }}>
        Register
    </h2>

    <form onSubmit={register} style={{ marginBottom: '20px' }}>
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
                    borderRadius: '4px'
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
        </div>

        <div style={{ marginBottom: '15px' }}>
            <input 
                type="email"
                placeholder="Email"
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #333',
                    color: '#ffffff',
                    borderRadius: '4px'
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>

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
                    borderRadius: '4px'
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>

        <button type="submit" className="btn" style={{ width: '100%' }}>
            Daftar
        </button>
    </form>

    <p style={{ color: '#ffffff', fontSize: '0.95em', margin: '0' }}>
        Sudah punya akun? 
        <span 
            onClick={goLogin}
            style={{ 
                color: '#d6bf59',
                cursor: 'pointer',
                marginLeft: '5px',
                fontWeight: '600'
            }}
        >
            Login
        </span>
    </p>
</div>
  );
}
