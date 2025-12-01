import React, { useEffect, useState } from "react";

export default function Statistic() {
  const [stat, setStat] = useState(null);

  const fetchStat = async () => {
    const res = await fetch("http://localhost:5000/api/statistics");
    setStat(await res.json());
  };

  useEffect(() => { fetchStat(); }, []);

  if (!stat) return null;

  return (
    <section id="statistic" style={{ padding: "80px 0", textAlign: "center" }}>
      <h2 style={{ color: "#d6bf59", fontSize: "40px" }}>Statistik Scadrink</h2>
      <p style={{ color: "#bdbdbd", marginBottom: "40px" }}>
        Angka yang menunjukkan perkembangan Scadrink
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "25px"
        }}
      >
        {/* TOTAL PEMBELI */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Total Pembeli</h3>
          <div style={bigNumber}>{stat.totalBuyers}</div>
        </div>

        {/* TOTAL PENJUALAN */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Produk Terjual</h3>
          <div style={bigNumber}>{stat.totalSales}</div>
        </div>

        {/* TOP PRODUCTS */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Top 3 Minuman</h3>
          {stat.topProducts.length === 0 ? (
            <p style={{ color: "#ccc" }}>Belum ada data</p>
          ) : (
            stat.topProducts.map((p, i) => (
              <div key={i} style={rankItem}>{rankEmoji[i]} {p}</div>
            ))
          )}
        </div>

        {/* TOP USERS */}
        <div style={cardStyle}>
          <h3 style={cardTitle}>Top 3 Pembeli</h3>
          {stat.topUsers.length === 0 ? (
            <p style={{ color: "#ccc" }}>Belum ada data</p>
          ) : (
            stat.topUsers.map((u, i) => (
              <div key={i} style={rankItem}>{rankEmoji[i]} {u}</div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

const cardStyle = {
  background: "#111",
  padding: "20px",
  width: "260px",
  borderRadius: "12px",
  border: "2px solid #d6bf59",
  boxShadow: "0 0 0 rgba(214,191,89,0.0)",
  transition: "0.25s",
};

const cardTitle = {
  color: "#d6bf59",
  marginBottom: "10px",
  fontSize: "20px"
};

const bigNumber = {
  fontSize: "40px",
  fontWeight: "700",
  color: "#fff"
};

const rankItem = {
  color: "#fff",
  marginTop: "5px",
  fontSize: "17px"
};

const rankEmoji = ["🥇", "🥈", "🥉"];
