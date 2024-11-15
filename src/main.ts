import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './filter/global-exception.filter';
import { TypeOrmExceptionFilter } from './filter/type-orm-exception.filter';
import { GlobalResponseInterceptor } from './interceptor/global-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors();
  // Set global prefix
  app.setGlobalPrefix('api');
  // Set exception filter
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new TypeOrmExceptionFilter(),
  );
  // Set response interceptor
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  // Start the server
  await app.listen(7089);
}
bootstrap();
