import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { resolve } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(resolve('./src/public'));
  app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('hbs');

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('아임택시 호출 연동 API')
    .setDescription('아임택시 호출을 원하는 서비스들을 위한 연동서비스')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  document.servers = [{ url: `/api` }];
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('/api');
  await app.listen(3030);
}
bootstrap();
