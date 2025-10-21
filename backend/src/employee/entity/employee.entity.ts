import { Employee } from '../employee.model';

export class EmployeeEntity {
  id!: string;
  firstName!: string;
  lastName!: string;
  email?: string;
  phone?: string;
  companies?: string[];

  public static encode(Employee: Employee): EmployeeEntity {
    const { _id, firstName, lastName, email, phone, companies } = Employee;
    return {
      id: _id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      companies: companies,
    };
  }
}
