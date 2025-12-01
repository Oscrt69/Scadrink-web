import React, {useEffect, useState} from 'react'
import ProductCard from './ProductCard'

export default function Menu(){
  const [products, setProducts] = useState([])
  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products')
    const data = await res.json()
    setProducts(data)
  }
  useEffect(()=>{ fetchProducts() },[])
  return (
    <section id="menu" style={{paddingTop:40}}>
      <h2 
  style={{
    textAlign: 'center', 
    color: '#d6bf59',
    fontSize: '48px',          // ⬅ diperbesar
    letterSpacing: '3px',      // tampak lebih mewah
    textShadow: '0 0 8px rgba(214,191,89,0.35)'  // glow halus
  }}
>
  Menu Kami
</h2>
      <p style={{textAlign:'center', color:'#bdbdbd'}}>Pilihan minuman premium untuk setiap selera</p>
      <div style={{height:30}} />
      <div className="card-grid">
  {products.length === 0 && (
    <div style={{ 
      color: '#bdbdbd',
      textAlign: 'center' 
    }}>
      Belum ada produk. Silakan buka halaman Developer untuk menambahkan.
    </div>
  )}

  {products.map(p => (
    <ProductCard key={p._id} product={p} />
  ))}
</div>

    </section>
  )
}
