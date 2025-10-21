import {_RootClient} from "./_root.client.ts";
import type {ProxyClient} from "./proxy/proxy.ts";
import type {ClientResponse} from "./response.ts";
import type {EmployeesResDto} from "../dto/employee/employees.res.dto.ts";
import type {EmployeeDto} from "../dto/employee/employee.dto.ts";
import type {CreateEmployeeDto} from "../dto/employee/create.employee.dto.ts";
import type {UpdateEmployeeDto} from "../dto/employee/update.employee.dto.ts";

export class EmployeeClient extends _RootClient{
    constructor(proxy: ProxyClient) {
        super(proxy);
    }

    getEmployees(search?: string, companyId?: string, page?: number, limit: number = 10): Promise<ClientResponse<EmployeesResDto>> {
        const params = new URLSearchParams();

        if (search) params.append('search', search);
        if (companyId) params.append('employeeId', companyId);
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());

        const query = params.toString();
        const link = `/employee${query ? `?${query}` : ''}`;
        return this.proxy.get(link);
    }

    create(content: CreateEmployeeDto): Promise<ClientResponse<EmployeeDto>> {
        return this.proxy.post('/employee', content);
    }

    getEmployee(id: string): Promise<ClientResponse<EmployeeDto>> {
        return this.proxy.get(`/employee/${id}`);
    }

    update(id: string, content: UpdateEmployeeDto): Promise<ClientResponse<EmployeeDto>> {
        return this.proxy.patch(`/employee/${id}`, content);
    }

    delete(id: string): Promise<ClientResponse<void>> {
        return this.proxy.del(`/employee/${id}`);
    }
}
