import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = Number(configService.get('APP_PORT'));

  if (['local', 'dev'].includes(<string>configService.get('ENV'))) {
    const config = new DocumentBuilder()
      .setTitle('Mini-CRM API Doc')
      .setDescription('API Documentation for Mini-CRM')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
          name: 'Authorization',
          description: 'Enter JWT token',
        },
        'access-token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    console.log('Swagger Live');
  }

  await app.listen(port).then(() => console.log(`Listening on port ${port}`));
}
bootstrap();
