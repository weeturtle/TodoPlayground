import axios from 'axios';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

// Add an axios instance with the base URL and the token in the headers
// to the context so that it can be used in the whole app

export interface AuthContext {
  // eslint-disable-next-line no-unused-vars
  setToken: (token: string) => void;
  token: string | null;
  // Add the axios client here
  isAuthed: boolean;
}

export const AuthContext = createContext<AuthContext>({
  setToken: () => {},
  token: '',
  isAuthed: false,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem('token'),
  );
  const [isAuthed, setIsAuthed] = useState(false);

  axios.defaults.baseURL = process.env.URL;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('token', token);
      setIsAuthed(true);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      setIsAuthed(false);
    }
  }, [token]);

  const contextValue = useMemo(
    () => ({
      setToken: (token: string) => {
        _setToken(token);
      },
      token,
      isAuthed,
    }),
    [token, isAuthed],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
