import type {
  AuthCredentials,
  AuthCredentialsWithClaims,
} from '../tools/token.ts';
import type { ClientManagerType } from '../infrastructure/client/manager.ts';
import React, { useContext } from 'react';

export type AppUserProviderProps = {
  user: AuthCredentialsWithClaims | null;
  client: ClientManagerType;
};

type AppUserContextContent = AppUserProviderProps & {
  isAuthorized: boolean;
  signIn: (credentials: AuthCredentials, rememberMe: boolean) => void;
};

export const AppUserContext = React.createContext<AppUserContextContent | null>(
  null,
);

export const useAppUser = () => useContext(AppUserContext)!;
