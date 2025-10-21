import {
  type AuthCredentialsWithClaims,
  CREDENTIALS_KEY,
  parseTokenCredentials,
} from './token.ts';
import { getCookie } from './cookie.ts';
import { AxiosProxy } from '../infrastructure/client/proxy/axios.proxy.ts';
import {
  type ClientManagerType,
  createClientManager,
} from '../infrastructure/client/manager.ts';

export type ConnectionType = {
  credentials: AuthCredentialsWithClaims | null;
  client: ClientManagerType;
};

interface SimpleRequest {
  headers: {
    cookie?: string;
  };
}

const API_URL = import.meta.env.REACT_APP_PUBLIC_API_URL ?? 'http://localhost:5555';

export const getConnection = (req?: SimpleRequest): ConnectionType => {
  if (!req && typeof window == 'undefined') {
    throw 'Please, to use connection provide REQ object';
  }

  const fullCookieString = req ? req.headers.cookie : window.document.cookie;
  const credentialsJsonString = getCookie(
    CREDENTIALS_KEY,
    fullCookieString || '',
  );
  const credentials = parseTokenCredentials(credentialsJsonString);
  return {
    credentials,
    client: createClientManager(
      new AxiosProxy(API_URL, credentials?.accessToken ?? ''),
    ),
  };
};
