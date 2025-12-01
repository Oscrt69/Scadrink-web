import React from 'react'

export default function About(){
  return (
    <section
      id="about"
      style={{
        height: "800px",             // tinggi section
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",     // agar isi tetap center vertikal
        alignItems: "center",
        textAlign: "center",
        padding: "0 20px"
      }}
    >
      
      {/* TITLE (Tentang + SCADRINK) */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        
        {/* Tulisan 'Tentang' */}
        <span
          style={{
            fontSize: "18px",
            color: "#ffffff",
            letterSpacing: "2px",
            opacity: 0.8
          }}
        >
          TENTANG
        </span>

        {/* Tulisan SCADRINK */}
        <h1
          style={{
            color: '#d6bf59',
            fontSize: '3.2em',
            margin: 0,
            letterSpacing: '6px',
            textShadow: '0 0 10px rgba(214, 191, 89, 0.5)',
            fontWeight: 700
          }}
        >
          SCADRINK
        </h1>
      </div>

      {/* PARAGRAF */}
      <div style={{ maxWidth: 700, marginTop: 20, marginBottom: 50}}>
        <p style={{ color: "#cccccc", lineHeight: "1.6" }}>
          Scadrink hadir sebagai brand minuman lokal yang berkomitmen menghadirkan
          pengalaman minum yang lebih berkualitas, praktis, dan terjangkau. Kami percaya
          bahwa setiap orang berhak menikmati minuman lezat tanpa harus menunggu lama
          atau mengeluarkan biaya besar. Melalui sistem pre-order yang mudah dan efisien,
          kami memastikan setiap pesanan diracik dengan fresh tepat sebelum dikirimkan
          kepada pelanggan.
          <br /><br />
          Kami terus berinovasi dalam menciptakan menu baru, memilih bahan terbaik,
          serta menjaga kualitas rasa di setiap gelas. Scadrink bukan hanya tentang
          minuman — kami ingin membangun pengalaman yang menyenangkan, menjaga kualitas
          pelayanan, dan menjadi pilihan utama untuk menemani hari-hari pelanggan.
        </p>
      </div>

    </section>
  )
}
