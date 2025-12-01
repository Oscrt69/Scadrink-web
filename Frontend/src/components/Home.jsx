import React, { useEffect, useState } from "react";

// Frasa Statis
const staticPhrase = "From One for "; 
// Daftar Frasa Dinamis yang akan dianimasikan
const dynamicPhrases = ["Everyone", "Tea Enthusiasts", "Coffee Lover"]; 

// Pengaturan Animasi
const TYPING_SPEED = 70; 
const DELETING_SPEED = 70; 
const PAUSE_DURATION = 1500; // Jeda setelah selesai mengetik (ms)

const LOGO_HIDE_BREAKPOINT = 600; 

export default function Home() {
  // text kini hanya menyimpan bagian dinamisnya
  const [typedText, setTypedText] = useState(''); 
  const [isAnimating, setIsAnimating] = useState(true);
  const [isLogoVisible, setIsLogoVisible] = useState(true); 
  
  // State baru untuk mengontrol indeks frasa dan arah animasi
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Matikan animasi dan sembunyikan logo pada layar kecil
    const handleResize = () => {
      const isMobile = window.innerWidth < 900;
      const isExtraSmallScreen = window.innerWidth < LOGO_HIDE_BREAKPOINT;

      // 1. Kontrol Animasi Typing
      if (isMobile) {
        setIsAnimating(false);
        // Tampilkan frasa statis + frasa pertama secara penuh
        setTypedText(dynamicPhrases[0]); 
      } else {
        setIsAnimating(true);
      }

      // 2. Kontrol Visibilitas Logo
      if (isExtraSmallScreen) {
        setIsLogoVisible(false); 
      } else {
        setIsLogoVisible(true); 
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ANIMASI KETIK-HAPUS (Diperbarui untuk frasa bergantian)
  useEffect(() => {
    if (!isAnimating) return;

    const currentPhrase = dynamicPhrases[phraseIndex];
    let timer;

    const handleTyping = () => {
      if (isDeleting) {
        // Mode HAPUS: Hapus satu karakter
        setTypedText((prev) => currentPhrase.substring(0, prev.length - 1));
      } else {
        // Mode KETIK: Tambah satu karakter
        setTypedText((prev) => currentPhrase.substring(0, prev.length + 1));
      }
    };

    // 1. Pengetikan selesai (Teks sudah penuh)
    if (!isDeleting && typedText === currentPhrase) {
        // Jeda sebentar sebelum mulai menghapus
        timer = setTimeout(() => setIsDeleting(true), PAUSE_DURATION); 
    }
    // 2. Penghapusan selesai (Teks kosong)
    else if (isDeleting && typedText === "") {
        setIsDeleting(false);
        // Pindah ke frasa berikutnya secara berulang
        setPhraseIndex(prev => (prev + 1) % dynamicPhrases.length);
    }
    // 3. Lanjutkan mengetik/menghapus
    else {
      const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
      timer = setTimeout(handleTyping, speed);
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex, isAnimating]);


  return (
    <section className="hero" id="home">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "90%",
          maxWidth: "1400px",
          height: "auto",
          minHeight: "650px",
          margin: "0 auto",
          padding: "60px 20px",
          gap: "60px",
        }}
      >
        {/* LEFT TEXT */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h1
            style={{
              fontSize: "52px",
              lineHeight: "1.1",
              margin: 0,
              fontWeight: "700",
              backgroundImage: "linear-gradient(90deg, #d6bf59 0%, #fefefe 70%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {/* Teks Statis di Depan */}
            {staticPhrase} 
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: "1.2em",
              }}
            >
              {/* Teks Dinamis */}
              {typedText} 

              {/* Kursor gold hanya muncul jika animasi aktif dan saat mengetik/menghapus */}
              {isAnimating && (
                <span
                  style={{
                    width: "4px",
                    height: "1.1em",
                    background: "#d6bf59",
                    marginLeft: "5px",
                    animation: "blink 0.7s infinite",
                  }}
                ></span>
              )}
            </span>
          </h1>

          <p style={{ color: "#bdbdbd", marginTop: "15px", maxWidth: "420px" }}>
            Nikmati minuman berkualitas tinggi yang diracik dengan bahan pilihan.
            Pesan terlebih dahulu, ambil tanpa menunggu, dan rasakan kesegaran yang
            selalu terjaga.
          </p>

          <button
            className="btn"
            style={{ marginTop: "20px" }}
            onClick={() =>
              document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <strong>Lihat Menu</strong>
          </button>
        </div>

        {/* RIGHT LOGO RESPONSIVE - Disembunyikan jika isLogoVisible false */}
        {isLogoVisible && (
          <div
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "#d6bf59",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 40px rgba(214,191,89,0.4)",
              overflow: "hidden",
              animation: "floatLogo 3s ease-in-out infinite",
              margin: "0 auto",
            }}
          >
            <img
              src="http://localhost:5000/uploads/logo.png"
              alt="logo"
              style={{
                width: "250px",
                height: "auto",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}