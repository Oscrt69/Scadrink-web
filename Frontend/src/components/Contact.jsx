import React from 'react'

export default function Contact() {
  return (
    <section 
      id="contact"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: "10%",
        padding: '80px 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    >

      {/* LEFT COLUMN */}
      <div style={{ flex: 1 }}>
        <h2 style={{ color: '#d6bf59', fontSize: 36 }}>Hubungi Kami</h2>
        <p style={{ color: '#bdbdbd', marginTop: 10 }}>
          Ada pertanyaan? Jangan ragu untuk menghubungi kami
        </p>

        <div style={{ marginTop: 20 }}>
          <div style={{ background: '#222', padding: 18, borderRadius: 12, marginBottom: 12 }}>
            <strong>Telepon</strong>
            <div style={{ color: '#bdbdbd' }}>+62 812-3445-3346</div>
          </div>

          <div style={{ background: '#222', padding: 18, borderRadius: 12, marginBottom: 12 }}>
            <strong>Email</strong>
            <div style={{ color: '#bdbdbd' }}>scadrink@gmail.com</div>
          </div>

          <div style={{ background: '#222', padding: 18, borderRadius: 12 }}>
            <strong>Lokasi</strong>
            <div style={{ color: '#bdbdbd' }}>Surabaya</div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN (IMAGE) */}
      <div
        style={{
          width: 250,
          height: 250,
          borderRadius: '50px',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #d6bf59 100%)',
          boxShadow: '0 15px 30px rgba(212, 175, 55, 0.3)',
          marginTop: '180px'
        }}
      >
        <img
          src="http://localhost:5000/uploads/logo.png"
          alt="logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px'
          }}
        />
      </div>

    </section>
  )
}
