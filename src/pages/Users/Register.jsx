import { useState } from 'react';
import { NavLink } from 'react-router-dom';
const Register = () => {
  const [client, setClient] = useState({ country: 'TW' });
  const [errorNumber, setErrorNumber] = useState(0);

  function errorHandler(number) {
    let errors = ['', 'email', 'password', 'last_name', 'first_name', 'phone', 'country', 'birthday'];
    setErrorNumber(number);
    document.getElementById(errors[number]).focus();
  }

  const onButtonClick = async () => {
    try {
      const { email, password, password_check, last_name, first_name, phone, country, birthday } = client;
      if ('' === email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        errorHandler(1, 'email');
        return;
      }
      if ('' === password || password.length < 7 || password !== password_check) {
        errorHandler(2);
        return;
      }
      if ('' === first_name) {
        errorHandler(3);
        return;
      }
      if ('' === last_name) {
        errorHandler(4);
        return;
      }
      if (!/^[0-9]+$/.test(phone) || phone.length !== 10) {
        errorHandler(5);
        return;
      }
      if ('' === country) {
        errorHandler(6);
        return;
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday) || birthday >= new Date().toISOString().split('T')[0]) {
        errorHandler(7);
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...client,
          city: client.city || null,
          carrier_code: client.carrier_code || null,
        }),
        credentials: 'include',
        mode: 'cors',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Register failed.');
      alert('註冊成功，請前往登入');
      window.location.href = '/login';
    } catch (error) {
      errorHandler(parseInt(error.message.split('|')[0]));
      console.log(errorNumber);
      console.error(error);
    }
  };
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='flex w-full flex-col md:w-1/2'>
        <h1 className='mx-auto mb-4 mt-8 text-4xl font-bold'>Register</h1>
        <h2 className='mx-auto  mb-8 mt-4 text-2xl'>
          會員註冊
          <NavLink to={'/login'} className={'ml-4 text-blue-500 hover:underline'}>
            back
          </NavLink>
        </h2>
        <div className='mb-4'>
          <label htmlFor='email' className='mb-1 block'>
            帳號(E-Mail)*
          </label>
          <input
            id='email'
            name='email'
            placeholder='E-Mail'
            type='text'
            className='w-full border border-slate-200 p-4'
            onChange={(e) => setClient((prev) => ({ ...prev, email: e.target.value }))}
          />
          <p className='text-red-500'>{errorNumber === 1 ? '請輸入正確的電子郵件地址' : ''}</p>
        </div>
        <div className='mb-4'>
          <label htmlFor='user_password1' className='mb-1 block'>
            設定密碼*
          </label>
          <input
            id='password'
            name='password'
            placeholder='Password'
            type='password'
            className='w-full border border-slate-200 p-4'
            onChange={(e) => setClient((prev) => ({ ...prev, password: e.target.value }))}
          />
          <p className='text-red-500'>{errorNumber === 2 ? '密碼不符合請重新輸入' : ''}</p>
        </div>
        <div className='mb-4'>
          <label htmlFor='user_password2' className='mb-1 block'>
            確認密碼*
          </label>
          <input
            id='passwordCheck'
            name='passwordCheck'
            placeholder='Retype Password'
            type='password'
            className='w-full border border-slate-200 p-4'
            onChange={(e) => setClient((prev) => ({ ...prev, password_check: e.target.value }))}
          />
          <p className='text-red-500'>{errorNumber === 2 ? '密碼不符合請重新輸入' : ''}</p>
        </div>
        <div className='mb-4 flex flex-col md:flex-row'>
          <div className='mb-2 md:mb-0 md:mr-2 md:w-full'>
            <label htmlFor='last_name' className='mb-1 block'>
              姓*
            </label>
            <input
              id='last_name'
              name='last_name'
              placeholder='Last Name'
              type='text'
              className='w-full border border-slate-200 p-4'
              onChange={(e) => setClient((prev) => ({ ...prev, last_name: e.target.value }))}
            />
            <p className='text-red-500'>{errorNumber === 3 ? '請輸入正確的姓氏' : ''}</p>
          </div>
          <div className='md:w-full'>
            <label htmlFor='first_name' className='mb-1 block'>
              名*
            </label>
            <input
              id='first_name'
              name='first_name'
              placeholder='First Name'
              type='text'
              className='w-full border border-slate-200 p-4'
              onChange={(e) => setClient((prev) => ({ ...prev, first_name: e.target.value }))}
            />
            <p className='text-red-500'>{errorNumber === 4 ? '請輸入正確的名字' : ''}</p>
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor='mobile' className='mb-1 block'>
            手機電話*
          </label>
          <div className='flex items-center'>
            <img src='' alt='' className='mr-2' />
            <input
              id='phone'
              name='phone'
              placeholder='09********'
              type='text'
              className='w-full border border-slate-200 p-4'
              onChange={(e) => setClient((prev) => ({ ...prev, phone: e.target.value }))}
            />
            <p className='text-red-500'>{errorNumber === 5 ? '請輸入正確的手機號碼' : ''}</p>
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor='country' className='mb-1 block'>
            國家*
          </label>
          <select
            name='country'
            id='country'
            className='w-full border border-slate-200 p-4'
            value={client.country}
            onChange={(e) => setClient((prev) => ({ ...prev, country: e.target.value }))}>
            <option value='TW'>Taiwan</option>
            <option value='JP'>Japan</option>
            <option value='AS'>American Samoa</option>
          </select>
          <p className='text-red-500'>{errorNumber === 6 ? '請輸入正確的國家' : ''}</p>
        </div>
        <div className='mb-4 '>
          <label htmlFor='city' className='mb-1 block'>
            城市
          </label>
          <input
            id='city'
            name='city'
            placeholder='City'
            type='text'
            className='w-full border border-slate-200 p-4'
            onChange={(e) => setClient((prev) => ({ ...prev, city: e.target.value }))}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='birthday' className='mb-1 block'>
            生日*
          </label>
          <input
            id='birthday'
            name='birthday'
            type='date'
            className='w-full border border-slate-200 p-4'
            onChange={(e) => setClient((prev) => ({ ...prev, birthday: e.target.value }))}
          />
          <p className='text-red-500'>{errorNumber === 7 ? '請輸入正確的生日' : ''}</p>
        </div>
        <div className='mb-4'>
          <label htmlFor='birthday' className='mb-1 block'>
            電子載具
          </label>
          <input
            id='carrier_code'
            name='carrier_code'
            type='text'
            className='w-full border border-slate-200 p-4'
            onChange={(e) => setClient((prev) => ({ ...prev, carrier_code: e.target.value }))}
          />
        </div>
        <button className='mb-4 rounded-lg bg-crimson px-6 py-3 text-xl text-black' onClick={onButtonClick}>
          Register
        </button>
      </div>
    </div>
  );
};
export default Register;
