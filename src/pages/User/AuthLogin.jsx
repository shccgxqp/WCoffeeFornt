import { useEffect } from 'react';

const AuthLogin = () => {
  useEffect(() => {
    async function AuthLoginCheck() {
      const response = await fetch('http://localhost:3060/api/auth/checkLogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    }

    AuthLoginCheck()
      .then(() => {
        console.log('第三方登入驗證成功');
        window.location.href = '/';
      })
      .catch((error) => {
        console.log('第三方登入驗證失敗', error);
        Window.location.href = '/';
      });
  }, []);

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='loader border-gray-200 h-32 w-32 rounded-full border-8 border-t-8 ease-linear'>
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default AuthLogin;
