// src/products/products.service.ts

import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

// *** สำคัญมาก: ต้องมี export ตรงนี้ ***
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(createProductDto: CreateProductDto) {
    const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    
    // สร้าง object ใหม่โดยดึงค่าจาก DTO ทีละตัว
    const newProduct: Product = {
      id: newId,
      name: createProductDto.name,
      price: createProductDto.price,
      // *** แก้ไขตรงนี้: เติม || '' เพื่อกันค่าเป็น undefined ***
      description: createProductDto.description || '', 
    };

    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return this.products.find(product => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = {
        ...this.products[productIndex],
        ...updateProductDto,
      };
      this.products[productIndex] = updatedProduct;
      return updatedProduct;
    }
    return null;
  }

  remove(id: number) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      return { deleted: true };
    }
    return { deleted: false };
  }
}