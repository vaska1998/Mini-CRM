import { _RootClient } from './_root.client.ts';
import type { ProxyClient } from './proxy/proxy.ts';
import type { ClientResponse } from './response.ts';
import type {
  AuthLoginSignInRequest,
  AuthLoginSignInResponse,
} from '../dto/auth/login.ts';

export class AuthClient extends _RootClient {
  constructor(proxy: ProxyClient) {
    super(proxy);
  }

  login(
    content: AuthLoginSignInRequest,
  ): Promise<ClientResponse<AuthLoginSignInResponse>> {
    return this.proxy.post('/api/auth/login', content);
  }
}
