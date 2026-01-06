// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // อย่าลืม import บรรทัดนี้ 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // บรรทัดนี้สำคัญมาก ต้องมีเพื่อให้กฎใน DTO ทำงาน 
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,            // ตัด property ที่ไม่ได้นิยามไว้ใน DTO ออก 
    forbidNonWhitelisted: true, // แจ้งเตือน error หากมีการส่งค่าอื่นนอกเหนือจากที่กำหนด 
    transform: true,            // แปลงชนิดข้อมูลให้อัตโนมัติตาม DTO 
  }));

  // เปิดใช้งาน CORS เพื่ออนุญาตให้ Next.js (Frontend) เรียกใช้ API ได้ 
  app.enableCors(); 

  // กำหนด Port ที่จะให้ Server ทำงาน (ปกติคือ 3000) 
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();