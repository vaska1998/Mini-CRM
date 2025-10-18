import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as process from 'node:process';
import { configValidationSchema } from './config.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.ENV}`],
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
})
export class AppModule {}
