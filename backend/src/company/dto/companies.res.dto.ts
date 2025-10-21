import { CompanyEntity } from '../entity/company.entity';

export class CompaniesResponseDto {
  data!: CompanyEntity[];
  total!: number;
  page!: number;
  limit!: number;
}
