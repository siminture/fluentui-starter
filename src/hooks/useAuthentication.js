import { useSessionStorage } from 'react-use';

const defaultValues = Object.freeze({
  isAuthenticated: false,
  principal: null
});

export default function useAuthentication(storageKey = 'authentication') {
  const [authentication, setAuthentication] = useSessionStorage(
    storageKey,
    defaultValues
  );

  const login = principal =>
    setAuthentication({ isAuthenticated: true, principal });

  const logout = () => setAuthentication(defaultValues);

  return {
    ...authentication,
    login,
    logout
  };
}
