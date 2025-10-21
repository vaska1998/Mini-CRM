import React, { type PropsWithChildren, useState } from 'react';
import {
  createClientManager,
  type ClientManagerType,
} from '../infrastructure/client/manager';
import { AxiosProxy } from '../infrastructure/client/proxy/axios.proxy';
import {
  parseTokenClaims,
  saveTokenToCookie,
  type AuthCredentials,
  type AuthCredentialsWithClaims,
} from '../tools/token';
import { AppUserContext } from '../contexts/user.context';

export type AppUserProviderProps = {
  user: AuthCredentialsWithClaims | null;
  client: ClientManagerType;
};

export const AppUserProvider: React.FC<
  PropsWithChildren<AppUserProviderProps>
> = ({ children, user, client }) => {
  const [reactUser, setReactUser] = useState<AuthCredentialsWithClaims | null>(
    user,
  );
  const [isAuthorized, setIsAuthorized] = useState(!!user);
  const [reactClient, setReactClient] = useState(client);

  const signIn = (credentials: AuthCredentials, rememberMe: boolean) => {
    const { accessToken } = credentials;
    saveTokenToCookie({ accessToken, refreshToken: '' }, rememberMe);
    const claims = parseTokenClaims(accessToken);
    setReactUser({ accessToken, refreshToken: '', claims });
    setIsAuthorized(true);
    setReactClient(
      createClientManager(
        new AxiosProxy(
          import.meta.env.REACT_APP_PUBLIC_API_URL ?? 'http://localhost:5555',
          accessToken,
        ),
      ),
    );
  };

  return (
    <AppUserContext.Provider
      value={{ user: reactUser, isAuthorized, client: reactClient, signIn }}
    >
      {children}
    </AppUserContext.Provider>
  );
};
