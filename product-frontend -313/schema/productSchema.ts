import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'ต้องระบุชื่อสินค้า'),
  price: z.coerce.number().min(1, 'ราคาต้องมากกว่า 0'),
  description: z.string().optional(),
});

export type ProductFormInputs = z.infer<typeof productSchema>;