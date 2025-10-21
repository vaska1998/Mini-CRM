import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import * as process from 'node:process';
import { configValidationSchema } from './config.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyModule } from './company/company.module';
import { EmployeeModule } from './employee/employee.module';
import { NotificationsModule } from './notifications/notifications.module';

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
    CompanyModule,
    EmployeeModule,
    NotificationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
