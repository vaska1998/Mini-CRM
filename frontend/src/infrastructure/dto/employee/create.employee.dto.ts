export interface CreateEmployeeDto {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    companies: string[];
}
