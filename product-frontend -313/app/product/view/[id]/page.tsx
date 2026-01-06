'use client';
import { useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { productSchema, ProductFormInputs } from '@/schema/productSchema';

export default function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/products/${id}`).then(res => {
      setValue('name', res.data.name);
      setValue('price', res.data.price);
      setValue('description', res.data.description);
    });
  }, [id, setValue]);

  const onSubmit = async (data: ProductFormInputs) => {
    await axios.patch(`http://localhost:3000/products/${id}`, data);
    router.push('/product');
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">แก้ไขสินค้า</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">ชื่อสินค้า</label>
          <input {...register('name')} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">ราคา</label>
          <input type="number" {...register('price')} className="w-full border p-2 rounded" />
          {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">บันทึก</button>
      </form>
    </div>
  );
}