import axios from 'axios';
import { useState } from 'react';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const onSubmit = async () => {
    if (!email || !password || !passwordConf) {
      alert('Please fill in all fields');
      return;
    } else if (password !== passwordConf) {
      alert('Passwords do not match');
      return;
    }

    console.log('Registering user...');
    const response = await axios.post('/auth/register', {
      email,
      password,
    });

    console.log(response.data);
  };

  return (
    <>
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
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConf}
        onChange={(e) => setPasswordConf(e.target.value)}
      />
      <button onClick={onSubmit}>Register</button>
    </>
  );
};

export default RegisterPage;
