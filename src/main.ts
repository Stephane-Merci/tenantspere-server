import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Tenant Sphere")
    .setDescription("This is the Tenant Sphere API")
    .setVersion('1.0')
    .addTag('tenant sphere')
    .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig)
    SwaggerModule.setup('api', app, document)

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
