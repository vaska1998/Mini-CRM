import { Company } from '../company.model';

export class CompanyEntity {
  id!: string;
  name!: string;
  email?: string;
  website?: string;

  public static encode(company: Company): CompanyEntity {
    const { _id, name, email, website } = company;
    return {
      id: _id,
      name: name,
      email: email,
      website: website,
    };
  }
}
