export interface EmployeeDto {
    id: string;
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    companies: string[];
}
