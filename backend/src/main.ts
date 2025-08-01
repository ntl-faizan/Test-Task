import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for all origins (development only)
  app.enableCors({
    origin: 'http://localhost:3002', // your frontend URL
    credentials: true,
  });

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('Movie Watchlist API')
    .setDescription('API documentation for the movie watchlist app')
    .setVersion('1.0')
    .addBearerAuth() // adds Authorization: Bearer <token> to Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
