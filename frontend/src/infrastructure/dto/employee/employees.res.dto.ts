import type {EmployeeDto} from "./employee.dto.ts";

export interface EmployeesResDto {
    data: EmployeeDto[];
    total: number;
    page: number;
    limit: number;
}
