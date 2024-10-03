import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Login = ({ setTokens}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login/',
      {
        email,
        password
      });
      const { accessToken, refreshToken } = response.data;
      setTokens({ accessToken, refreshToken});
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

    } catch (error) {
      console.error('Autification Failed', error);
    }
  };

  return(
     <form onSubmit={handleSubmit}>
      <h2>Вход</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        />
      <button type="submit">Вход</button>
     </form>
  );
}

export default Login;