import type { ProxyClient } from './proxy/proxy.ts';
import { AuthClient } from './auth.client.ts';

export type ClientManagerType = {
  auth: AuthClient;
};

export const createClientManager = (proxy: ProxyClient): ClientManagerType => ({
  auth: new AuthClient(proxy),
});
