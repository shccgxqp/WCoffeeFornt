import { useState } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/useProvider';
import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

const Login = () => {
  const { setLoggedIn, setIsAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connectError, setConnectError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = location.state || { message: '' };

  const facebookLogin = () => {
    window.open(`${process.env.REACT_APP_API}/api/auth/login/facebook`, '_self');
  };
  const googleLogin = () => {
    window.open(`${process.env.REACT_APP_API}/api/auth/login/google`, '_self');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onButtonClick();
    }
  };
  const onButtonClick = async () => {
    setEmailError('');
    setPasswordError('');
    try {
      if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        setEmailError('請輸入正確的電子郵件');
        return;
      }
      if ('' === password || password.length < 7) {
        setPasswordError('密碼輸入錯誤');
        return;
      }
      const response = await fetch(`${process.env.REACT_APP_API}/api/signin`, {
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
      setIsAdmin(data.data.user.isAdmin);
      navigate('/');
    } catch (error) {
      console.error(error);
      setConnectError(error.message || '登入失敗，請稍後重試。');
    }
  };

  return (
    <div className='flex h-full items-center justify-center md:h-[720px]'>
      <div className='flex w-full flex-col md:w-2/5'>
        <h1 className='mx-auto mb-4 mt-8 text-4xl font-bold'>Login</h1>
        <div className='mt-4 text-red-500'>
          {connectError}
          {message}
        </div>
        <div className='mb-4'>
          <input
            value={email}
            placeholder='請輸入電子郵件地址'
            onChange={(ev) => setEmail(ev.target.value)}
            className='w-full border border-slate-200 p-4'
          />
          <p className='text-xs text-red-500'>{emailError}</p>
        </div>

        <div className='mb-4'>
          <input
            value={password}
            placeholder='請輸入密碼'
            onChange={(ev) => setPassword(ev.target.value)}
            onKeyDown={handleKeyPress}
            className='w-full border border-slate-200 p-4'
          />
          <p className='text-xs text-red-500'>{passwordError}</p>
        </div>

        <div className='flex flex-col items-center justify-center'>
          <input
            className='m-2 cursor-pointer rounded-lg border-none bg-crimson px-6 py-3 text-2xl text-black'
            type='button'
            onClick={onButtonClick}
            value='Log in'
          />
          <p className='mt-2 text-sm'>
            還沒有帳號，請點擊
            <NavLink to='/register' className='text-blue-500'>
              註冊
            </NavLink>
          </p>
          <hr className='border-gray-400 my-4 w-full border-t' />

          <div className='flex flex-col items-center justify-center lg:flex-row'>
            <FacebookLoginButton onClick={facebookLogin} />
            <GoogleLoginButton onClick={googleLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
