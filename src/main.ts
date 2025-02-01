import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import * as dotenv from 'dotenv';
import { loadEnvironmentVariables } from './config.helper';
import { useContainer } from 'class-validator';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  loadEnvironmentVariables()
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
