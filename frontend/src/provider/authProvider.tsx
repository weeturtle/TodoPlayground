import axios from 'axios';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

export interface AuthContext {
  // eslint-disable-next-line no-unused-vars
  setToken: (token: string) => void;
  token: string | null;
}

export const AuthContext = createContext<AuthContext>({
  setToken: () => {},
  token: '',
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );

  axios.defaults.baseURL = process.env.URL;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      setToken: (token: string) => {
        _setToken(token);
      },
      token,
    }),
    [token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
