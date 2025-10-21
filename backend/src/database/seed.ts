import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { UserSeeder } from './seeders/user.seeder';
import { User, UserDocument } from '../user/user.model';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../company/company.model';
import { Employee, EmployeeDocument } from '../employee/employee.model';
import { CompanySeeder } from './seeders/company.seeder';
import { EmployeeSeeder } from './seeders/employee.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userModel: Model<UserDocument> = app.get(getModelToken(User.name));
  const companyModel: Model<CompanyDocument> = app.get(
    getModelToken(Company.name),
  );
  const employeeModel: Model<EmployeeDocument> = app.get(
    getModelToken(Employee.name),
  );

  const companySeeder = new CompanySeeder(companyModel);
  await companySeeder.run();

  const employeeSeeder = new EmployeeSeeder(employeeModel, companyModel);
  await employeeSeeder.run();

  const seeder = new UserSeeder(userModel);
  await seeder.run();

  await app.close();
}

bootstrap().catch((err) => {
  console.error('Seeding failed', err);
  process.exit(1);
});
