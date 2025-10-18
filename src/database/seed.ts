import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { UserSeeder } from './seeders/user.seeder';
import { User, UserDocument } from '../user/user.model';
import { Model } from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userModel: Model<UserDocument> = app.get(getModelToken(User.name));

  const seeder = new UserSeeder(userModel);
  await seeder.run();

  await app.close();
}

bootstrap().catch((err) => {
  console.error('❌ Seeding failed', err);
  process.exit(1);
});
