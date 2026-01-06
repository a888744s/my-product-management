import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()  // <--- กฎนี้แหละครับที่จะทำให้เกิด Error ถ้าชื่อว่าง
    name: string;

    @IsNumber()
    @Min(0)        // <--- กฎห้ามราคาติดลบ
    price: number;

    @IsString()
    @IsOptional()
    description?: string;
}