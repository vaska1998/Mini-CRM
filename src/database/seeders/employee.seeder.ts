import { faker } from '@faker-js/faker';
import { Model } from 'mongoose';
import { EmployeeDocument } from '../../employee/employee.model';
import { CompanyDocument } from '../../company/company.model';

export class EmployeeSeeder {
  constructor(
    private readonly employeeModel: Model<EmployeeDocument>,
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  async run(): Promise<void> {
    const companies = await this.companyModel.find();
    if (companies.length === 0) {
      console.warn('No companies found. Run CompanySeeder first.');
      return;
    }

    const existing = await this.employeeModel.countDocuments();
    if (existing > 0) {
      console.log(`👥 ${existing} employees already exist`);
      return;
    }

    const employeesData = Array.from({ length: 100 }).map(() => {
      const randomCompanies = faker.helpers.arrayElements(
        companies.map((c) => c._id.toString()),
        faker.number.int({ min: 1, max: 3 }),
      );

      return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        companies: randomCompanies,
      };
    });

    await this.employeeModel.insertMany(employeesData);
    console.log('Created 100 employees');
  }
}
