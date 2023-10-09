import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

const logger = new Logger('main');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Svg server')
    .setDescription('The svg API description')
    .setVersion('1.0')
    .addTag('Svg')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  logger.log(`http://localhost:3333/swagger`);
  await app.listen(3333);
}
bootstrap();
