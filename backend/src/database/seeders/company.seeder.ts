import { faker } from '@faker-js/faker';
import { Model } from 'mongoose';
import { Company, CompanyDocument } from '../../company/company.model';

export class CompanySeeder {
  constructor(private readonly companyModel: Model<CompanyDocument>) {}

  async run(): Promise<Company[]> {
    const count = await this.companyModel.countDocuments();
    if (count > 0) {
      console.log(`${count} companies already exist`);
      return this.companyModel.find();
    }

    const companiesData = Array.from({ length: 10 }).map(() => {
      const companyName = faker.company.name();
      const domain = faker.internet.domainName();

      return {
        name: companyName,
        email: faker.internet.email({
          firstName: 'info',
          lastName: '',
          provider: domain,
        }),
        website: `https://www.${domain}`,
      };
    });

    const companies = await this.companyModel.insertMany(companiesData);
    console.log(`Created ${companies.length} companies`);

    return companies;
  }
}
