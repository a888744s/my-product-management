import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ color: '#1a73e8', marginBottom: '10px' }}>
        ระบบจัดการสินค้า (Product Management)
      </h1>
      <p style={{ color: '#5f6368', marginBottom: '30px' }}>
        Assignment: Fullstack Application (NestJS + Next.js)
      </p>

      {/* ปุ่มกดไปหน้าสินค้าที่เน้นให้เห็นชัดๆ */}
      <Link href="/product">
        <button style={{ 
          padding: '15px 40px', 
          fontSize: '1.2rem', 
          color: 'white', 
          backgroundColor: '#1a73e8', 
          border: 'none', 
          borderRadius: '8px', 
          cursor: 'pointer',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s'
        }}>
          เข้าสู่หน้าจัดการสินค้า 📦
        </button>
      </Link>

      <footer style={{ marginTop: '50px', fontSize: '0.8rem', color: '#9aa0a6' }}>
        รัน Backend ที่ Port 3000 | Frontend ที่ Port 3001
      </footer>
    </main>
  )
}