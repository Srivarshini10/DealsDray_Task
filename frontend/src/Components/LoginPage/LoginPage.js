import React, { useState } from 'react';
import './LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});

  const navigate=useNavigate()

  const nameRegex=/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/
  const passRegex=/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{6,}$/

  async function handleSubmit (e) {
    e.preventDefault();
    const valid=true;
    const response= await axios.get("http://localhost:5000/user");
    const existingUser= response.data.filter((user)=> user.username === username && user.password === password);

    if (!nameRegex.test(username)){
      setError({...error,username:"Invalid Credentials"})
      valid=false;
    }
    else if (!passRegex.test(password)){
      setError({...error,password:"Invalid Credentials"})
      valid=false;
    }
    else if(existingUser.length>0){
      navigate('/dash')
    }
  }

  return (
    <div>
      <header>LoginPage</header>
      <div className='container'>
      <table className="login-form">
        <tr>
          <td><label htmlFor="username">User Name</label></td>
          <td><input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />{error.username}</td>
        </tr>
        <tr>
          <td><label htmlFor="password">Password</label></td>
          <td><input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />{error.password}</td>
        </tr>
        <tr>
        <td></td>
        <td><button  className='login-button'onClick={handleSubmit}>Login</button></td></tr>
      </table>
      </div>
    </div>
  );
};

export default LoginPage;