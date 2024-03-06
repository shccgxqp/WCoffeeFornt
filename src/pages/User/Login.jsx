import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connectError, setConnectError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');
    try {
      if ('' === email) {
        setEmailError('請輸入電子郵件');
        return;
      }
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        setEmailError('請輸入正確的電子郵件');
        return;
      }
      if ('' === password) {
        setPasswordError('請輸入密碼');
        return;
      }
      if (password.length < 7) {
        setPasswordError('密碼長度不足');
        return;
      }
      const response = await fetch('http://localhost:3060/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: 'include',
        mode: 'cors',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed.');

      setLoggedIn(true);
      navigate('/');
    } catch (error) {
      console.error(error);
      setConnectError(error.message || '登入失敗，請稍後重試。');
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <div className='text-4xl font-bold'>
        <div>Login</div>
      </div>
      <br />
      <div className='text-red-500'>{connectError}</div>
      <br />
      <div className='items-start'>
        <input
          value={email}
          placeholder='請輸入電子郵件地址'
          onChange={(ev) => setEmail(ev.target.value)}
          className='font-4xl h-10 w-96 rounded-lg border-2 border-grey'
        />
        <p className='text-xs text-red-500'>{emailError}</p>
      </div>
      <br />
      <div className='items-start'>
        <input
          value={password}
          placeholder='請輸入密碼'
          onChange={(ev) => setPassword(ev.target.value)}
          className='font-4xl h-10 w-96 rounded-lg border-2 border-grey'
        />
        <p className='text-xs text-red-500'>{passwordError}</p>
      </div>
      <br />
      <div className='items-start'>
        <input
          className='m-2 cursor-pointer rounded-lg border-none bg-crimson px-6 py-3 text-2xl text-black'
          type='button'
          onClick={onButtonClick}
          value='Log in'
        />
      </div>
    </div>
  );
};

Login.propTypes = {
  setLoggedIn: PropTypes.func.isRequired,
};

export default Login;
