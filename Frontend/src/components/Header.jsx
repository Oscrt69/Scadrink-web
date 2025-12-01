import React, { useEffect, useState } from "react";

// Tentukan breakpoint untuk mode mobile
const MOBILE_BREAKPOINT = 768; 

// ================================================================
// KOMPONEN NAVLINK BARU UNTUK EFEK HOVER DESKTOP
// ================================================================
function NavLink({ href, children, onClick }) {
    const [isHovered, setIsHovered] = useState(false);
    
    // Gaya dasar untuk tautan
    const baseStyle = {
        color: "#fff",
        textDecoration: "none",
        fontWeight: "500",
        position: "relative",
        paddingBottom: "2px", // Ruang untuk underline
        transition: "color 0.2s ease-in-out",
        cursor: "pointer",
    };

    // Gaya untuk underline (diimplementasikan sebagai pseudo-element dengan span)
    const underlineStyle = {
        content: "''",
        position: "absolute",
        bottom: 0,
        left: 0,
        height: "2px",
        background: "#d6bf59", // Warna emas
        // Animasi Underscore dari Kiri ke Kanan:
        width: isHovered ? "100%" : "0%",
        transition: "width 0.3s ease-out",
    };

    return (
        <a 
            href={href} 
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                ...baseStyle,
                color: isHovered ? "#d6bf59" : "#fff", // Perubahan warna teks menjadi emas saat hover
            }}
        >
            {children}
            <span style={underlineStyle}></span>
        </a>
    );
}
// ================================================================

export default function Header({ onNavigate, username, isUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Toggle state menu burger
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Logika responsive untuk mendeteksi mode mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < MOBILE_BREAKPOINT);
      // Tutup menu jika berubah ke desktop
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fungsi navigasi yang juga menutup menu mobile
  const handleNavigation = (e, targetId) => {
    e.preventDefault();
    if (targetId === "user") {
        onNavigate("user");
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
    }
    // Pastikan menu tertutup setelah navigasi di mobile
    if (isMobileView) {
        setIsMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    sessionStorage.removeItem("route");
    onNavigate("landing");
    if (isMobileView) {
        setIsMenuOpen(false);
    }
  }

  return (
    <header
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        background: "rgba(0,0,0,0.8)", // Menggunakan opacity yang sedikit lebih tinggi
        position: "sticky",
        top: 0,
        zIndex: 100, // ZIndex lebih tinggi dari komponen lain
      }}
    >
      {/* ================================================================
      LEFT SIDE: LOGO / GREETING / BURGER ICON
      ================================================================
      */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
        }}
      >
        {isMobileView && (
          // Icon Burger Menu
          <div
            onClick={toggleMenu}
            style={{
              fontSize: "24px",
              cursor: "pointer",
              color: "#d6bf59",
              padding: "5px",
            }}
          >
            {isMenuOpen ? (
              <i className="fas fa-times"></i> // Ikon Silang (Tutup)
            ) : (
              <i className="fas fa-bars"></i> // Ikon Garis (Buka)
            )}
          </div>
        )}
        
        {/* Teks Sapaan */}
        {isUser && (isMobileView || !isMobileView) ? (
          <span style={{ 
            color: isMobileView ? "#d6bf59" : "#fff", 
            fontWeight: 600, 
            fontSize: isMobileView ? "18px" : "22px" 
          }}>
            {isMobileView ? (
              // Format Mobile
              <span style={{ color: "#fff" }}>
                 Hi, <span style={{ color: "#d6bf59" }}>{username}</span>
              </span>
            ) : (
              // Format Desktop
              <span style={{ color: "#fff" }}>
                Hi, <span style={{ color: "#d6bf59" }}>{username}</span>
              </span>
            )}
          </span>
        ) : (
          // Logo Statis saat tidak login
          <span style={{ color: "#d6bf59", fontWeight: 600, fontSize: "22px" }}>
            Scadrink
          </span>
        )}
      </div>

      {/* ================================================================
      RIGHT SIDE: NAV MENU / LOGOUT
      ================================================================
      */}
      {/* Desktop Nav - MENGGUNAKAN NavLink BARU */}
      {!isMobileView && (
        <nav style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          <NavLink href="#home" onClick={(e) => handleNavigation(e, "user")}>Home</NavLink>
          <NavLink href="#about" onClick={(e) => handleNavigation(e, "#about")}>About</NavLink>
          <NavLink href="#menu" onClick={(e) => handleNavigation(e, "#menu")}>Menu</NavLink>
          <NavLink href="#reviews" onClick={(e) => handleNavigation(e, "#reviews")}>Review</NavLink>
          <NavLink href="#contact" onClick={(e) => handleNavigation(e, "#contact")}>Contact</NavLink>
          
          {/* Logout Button Desktop */}
          <button className="btn" style={{ background: "#c0392b", padding: "8px 18px", borderRadius: "25px", border: "none", cursor: "pointer", color: "#ffffffff", fontWeight: "600", }} onClick={handleLogout}>
            Logout
          </button>
        </nav>
      )}

      {/* Mobile-Only Logout */}
      {isMobileView && (
          <button className="btn" style={{ background: "#c0392b", padding: "8px 18px", borderRadius: "25px", border: "none", cursor: "pointer", color: "#ffffffff", fontWeight: "600", }} onClick={handleLogout}>
            Logout
          </button>
      )}

      {/* ================================================================
      MOBILE OVERLAY MENU
      ================================================================
      */}
      {isMobileView && (
        <nav
          style={{
            position: "fixed",
            top: "56px", 
            left: isMenuOpen ? "0" : "-100%", 
            width: "100%",
            height: "calc(100vh - 56px)",
            background: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(5px)",
            zIndex: 90,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "30px",
            transition: "left 0.3s ease-in-out",
          }}
        >
          {/* Navigasi Mobile (TIDAK MENGGUNAKAN NavLink) */}
          <a href="#home" style={mobileLinkStyle} onClick={(e) => handleNavigation(e, "user")}>Home</a>
          <a href="#about" style={mobileLinkStyle} onClick={(e) => handleNavigation(e, "#about")}>About</a>
          <a href="#menu" style={mobileLinkStyle} onClick={(e) => handleNavigation(e, "#menu")}>Menu</a>
          <a href="#reviews" style={mobileLinkStyle} onClick={(e) => handleNavigation(e, "#reviews")}>Review</a>
          <a href="#contact" style={mobileLinkStyle} onClick={(e) => handleNavigation(e, "#contact")}>Contact</a>
        </nav>
      )}
    </header>
  );
}

// Gaya untuk link di Mobile Menu
const mobileLinkStyle = {
    color: "#fff", 
    textDecoration: "none", 
    padding: "15px 0", 
    width: "80%", 
    textAlign: "center", 
    fontSize: "18px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
};