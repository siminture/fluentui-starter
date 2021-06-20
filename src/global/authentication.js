import React from "react";
import { useSessionStorage } from "react-use";

const defaultValues = Object.freeze({
  isAuthenticated: false,
  principal: null,
  login: () => {},
  logout: () => {},
});

const STOREGE_KEY = "authentication";

export const AuthenticationContext = React.createContext(defaultValues);

export function AuthenticationProvider({ children }) {
  const [authentication, setAuthentication] = useSessionStorage(
    STOREGE_KEY,
    defaultValues
  );

  const login = (principal) =>
    setAuthentication({ isAuthenticated: true, principal });

  const logout = () => setAuthentication(defaultValues);

  const authenticationValue = { ...authentication, login, logout };

  return (
    <AuthenticationContext.Provider value={authenticationValue}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return React.useContext(AuthenticationContext);
}
