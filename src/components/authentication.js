import React from 'react';
import { useSessionStorage } from 'react-use';

const defaultValues = Object.freeze({
  isAuthenticated: false,
  principal: null,
  login: () => {},
  logout: () => {}
});

const AUTH_STOREGE_KEY = 'authentication';

export const AuthenticationContext = React.createContext(defaultValues);

export function AuthenticationProvider({ children }) {
  const [authentication, setAuthentication] = useSessionStorage(
    AUTH_STOREGE_KEY,
    defaultValues
  );

  const login = principal =>
    setAuthentication({ isAuthenticated: true, principal });

  const logout = () => setAuthentication(defaultValues);

  const values = { ...authentication, login, logout };

  return (
    <AuthenticationContext.Provider value={values}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return React.useContext(AuthenticationContext);
}
