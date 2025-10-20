import { EmployeeEntity } from '../entity/employee.entity';

export class EmployeesResDto {
  data!: EmployeeEntity[];
  total!: number;
  page!: number;
  limit!: number;
}
