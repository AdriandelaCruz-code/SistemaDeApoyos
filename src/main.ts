import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/nest/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log('NestJS app listening on http://localhost:3000');
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
