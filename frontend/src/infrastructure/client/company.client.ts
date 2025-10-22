import {_RootClient} from "./_root.client.ts";
import type {ProxyClient} from "./proxy/proxy.ts";
import type {ClientResponse} from "./response.ts";
import type {CompaniesResDto} from "../dto/company/companies.res.dto.ts";
import type {CompanyResDto} from "../dto/company/company.res.dto.ts";
import type {LogoDto} from "../dto/company/logo.dto.ts";

export class CompanyClient extends _RootClient {
    constructor(proxy: ProxyClient) {
        super(proxy);
    }

    getAll(): Promise<ClientResponse<CompanyResDto[]>> {
        return this.proxy.get('/company');
    }

    getCompaniesWithFilter(search?: string, employeeId?: string, page?: number, limit: number = 10): Promise<ClientResponse<CompaniesResDto>> {
        const params = new URLSearchParams();

        if (search) params.append('search', search);
        if (employeeId) params.append('employeeId', employeeId);
        if (page) params.append('page', page.toString());
        if (limit) params.append('limit', limit.toString());

        const query = params.toString();
        const link = `/company/filter${query ? `?${query}` : ''}`;
        return this.proxy.get(link);
    }

    create(content: FormData): Promise<ClientResponse<CompanyResDto>> {
        return this.proxy.post('/company', content);
    }

    getLogo(id:string): Promise<ClientResponse<LogoDto>> {
        return this.proxy.get(`/company/${id}/logo`);
    }

    getCompany(id: string): Promise<ClientResponse<CompanyResDto>> {
        return this.proxy.get(`/company/${id}`);
    }

    update(id: string, content: FormData): Promise<ClientResponse<CompanyResDto>> {
        return this.proxy.patch(`/company/${id}`, content);
    }

    delete(id: string): Promise<ClientResponse<void>> {
        return this.proxy.del(`/company/${id}`);
    }
}
