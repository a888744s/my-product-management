'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ProductList() {
  const [products, setProducts] = useState([]);

  // ดึงข้อมูลจาก Backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/products');
      setProducts(res.data);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ฟังก์ชันลบสินค้าพร้อมยืนยัน
  const handleDelete = async (id: number) => {
    if (confirm('🗑️ คุณแน่ใจใช่ไหมที่จะลบสินค้านี้?')) {
      await axios.delete(`http://localhost:3000/products/${id}`);
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* หัวข้อและปุ่มเพิ่มสินค้า */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-wide">จัดการสินค้า</h1>
          <Link href="/product/create" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg hover:shadow-blue-200 active:scale-95">
            + เพิ่มสินค้าใหม่
          </Link>
        </div>

        {/* บล็อกตารางสินค้า */}
        <div className="bg-white border border-gray-100 shadow-2xl rounded-3xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr className="text-gray-400 text-sm font-bold uppercase">
                <th className="p-6">ชื่อสินค้า</th>
                <th className="p-6 text-center">ราคา (บาท)</th>
                <th className="p-6 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p: any) => (
                <tr key={p.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-6 text-gray-800 font-bold text-lg">{p.name}</td>
                  <td className="p-6 text-blue-600 font-black text-center text-xl">
                    ฿{p.price.toLocaleString()}
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-3 text-xl">
                      <Link href={`/product/view/${p.id}`} title="ดู" className="bg-gray-100 hover:bg-blue-100 p-2 rounded-xl transition-all">👁️</Link>
                      <Link href={`/product/${p.id}`} title="แก้ไข" className="bg-gray-100 hover:bg-yellow-100 p-2 rounded-xl transition-all">✏️</Link>
                      <button onClick={() => handleDelete(p.id)} title="ลบ" className="bg-gray-100 hover:bg-red-100 p-2 rounded-xl transition-all">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-20 text-center text-gray-400 font-medium">ไม่มีข้อมูลสินค้าในระบบ</div>
          )}
        </div>
      </div>
    </div>
  );
}