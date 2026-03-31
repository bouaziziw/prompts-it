import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

const server = express();

const getAllowedOrigins = (): string[] => {
  const envOrigins = process.env.CORS_ORIGINS?.split(',')
    .map(origin => origin.trim())
    .filter(Boolean);

  if (envOrigins && envOrigins.length > 0) {
    return envOrigins;
  }

  return ['http://localhost:4200', 'https://your-frontend-domain.vercel.app'];
};

export const createNestServer = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));

  app.use(cookieParser());
  app.enableCors({
    origin: getAllowedOrigins(),
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Swagger is optional on Vercel unless you want public documentation

  await app.init();
  return app;
};

// Start the NestJS app immediately but without calling listen
createNestServer(server).catch(err => console.error('Nest Server failed to start', err));

// Vercel serverless function entry point
export default server;
