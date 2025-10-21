import type { ProxyClient } from './proxy/proxy.ts';
import { AuthClient } from './auth.client.ts';
import {CompanyClient} from "./company.client.ts";
import {EmployeeClient} from "./employee.client.ts";

export type ClientManagerType = {
    auth: AuthClient;
    company: CompanyClient;
    employee: EmployeeClient;
};

export const createClientManager = (proxy: ProxyClient): ClientManagerType => ({
    auth: new AuthClient(proxy),
    company: new CompanyClient(proxy),
    employee: new EmployeeClient(proxy),
});
