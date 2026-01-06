'use client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { productSchema, ProductFormInputs } from '@/schema/productSchema';

export default function CreateProduct() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema), // ใช้ Zod ตรวจสอบข้อมูล
  });

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      await axios.post('http://localhost:3000/products', data);
      alert('✅ บันทึกสินค้าสำเร็จ!');
      router.push('/product');
    } catch (error) { alert('❌ เกิดข้อผิดพลาด'); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-12 border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 mb-2">เพิ่มสินค้าใหม่</h1>
        <p className="text-gray-400 mb-10 font-medium">กรอกข้อมูลสินค้าให้ครบถ้วนเพื่อบันทึกเข้าสู่ระบบ</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-1">ชื่อสินค้า</label>
            <input 
              {...register('name')} 
              placeholder="เช่น กระเป๋าเป้สะพายหลัง"
              className={`w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none text-black bg-white focus:ring-4 focus:ring-blue-50 ${errors.name ? 'border-red-400' : 'border-gray-100 focus:border-blue-500'}`}
            />
            {errors.name && <p className="text-red-500 text-xs font-bold mt-1 ml-2">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-600 ml-1">ราคาสินค้า (บาท)</label>
            <input 
              type="number"
              {...register('price')} 
              placeholder="0.00"
              className={`w-full px-6 py-4 rounded-2xl border-2 transition-all outline-none text-black bg-white focus:ring-4 focus:ring-blue-50 ${errors.price ? 'border-red-400' : 'border-gray-100 focus:border-blue-500'}`}
            />
            {errors.price && <p className="text-red-500 text-xs font-bold mt-1 ml-2">{errors.price.message}</p>}
          </div>

          <div className="flex flex-col gap-4 pt-6">
            <button type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-blue-100 active:scale-95">
              บันทึกสินค้า
            </button>
            <button type="button" onClick={() => router.push('/product')}
              className="w-full bg-gray-50 hover:bg-gray-200 text-gray-500 py-4 rounded-2xl font-bold transition-all">
              ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}