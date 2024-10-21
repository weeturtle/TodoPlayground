import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export interface AuthContext {
  login: (token: string) => void;
  logout: () => void;
  verifyToken: () => void;
  token: string | null;
}

const AuthContext = createContext<AuthContext>({
  login: () => {},
  logout: () => {},
  verifyToken: () => {},
  token: '',
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchedToken = localStorage.getItem('token');

    if (fetchedToken) {
      setToken(fetchedToken);
    }
  }, []);

  const clearToken = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const verifyToken = () => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   setToken(token);
    // }
    console.log(`Verifying token...`);
  };

  const contextValue = useMemo(
    () => ({
      login: (token: string) => {
        localStorage.setItem('token', token);
        setToken(token);
      },
      logout: () => {
        clearToken();
      },
      verifyToken,
      token,
    }),
    [token],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthProvider;
