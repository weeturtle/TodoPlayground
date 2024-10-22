import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../provider/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken, token } = useAuth();

  const nav = useNavigate();

  useEffect(() => {
    if (token) {
      nav('/');
    }
  }, [token, nav]);

  const onSubmit = async () => {
    const response = await axios.post(`/auth/login`, {
      email,
      password,
    });

    if (response.data.token) {
      setToken(response.data.token || '');
      nav('/');
    } else {
      console.log('Login failed');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={onSubmit}>Login</button>
    </div>
  );
};

export default LoginPage;
