import type {CompanyResDto} from "./company.res.dto.ts";

export interface CompaniesResDto {
    data: CompanyResDto[];
    total: number;
    page: number;
    limit: number;
}
