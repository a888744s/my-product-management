// รวม import ไว้ในบรรทัดเดียวให้แล้วครับ
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  // ใส่ ParseIntPipe เพื่อให้แน่ใจว่าเป็นตัวเลข
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  // ใส่ ParseIntPipe ตรงนี้ด้วย
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  // อันนี้ที่คุณทำมา ถูกต้องแล้วครับ!
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}