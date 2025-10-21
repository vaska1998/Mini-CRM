import type { ProxyClient } from './proxy/proxy.ts';
import { AuthClient } from './auth.client.ts';
import {CompanyClient} from "./company.client.ts";

export type ClientManagerType = {
    auth: AuthClient;
    company: CompanyClient;
};

export const createClientManager = (proxy: ProxyClient): ClientManagerType => ({
    auth: new AuthClient(proxy),
    company: new CompanyClient(proxy),
});
