import { useEffect, useState } from 'react';

const UserDetailsEdit = () => {
  const [client, setClient] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    country: '',
    city: '',
    birthday: '',
    carrier_code: '',
  });

  useEffect(() => {
    async function getUserData() {
      const response = await fetch('http://localhost:3060/api/user/edit', {
        credentials: 'include',
        mode: 'cors',
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    }
    getUserData().then((data) => {
      setClient(data.data);
    });
  }, []);

  const onBtnUserEdit = () => {
    fetch('http://localhost:3060/api/user/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify(client),
    })
      .then(() => window.history.back())
      .catch((err) => console.error(err));
  };

  return (
    <div className='flex h-full items-center justify-center'>
      <div className='flex w-full flex-col md:w-1/2'>
        <h1 className='mx-auto mb-4 mt-8 text-4xl font-bold'>基本資料編輯</h1>
        <div className='mb-4 flex flex-col md:flex-row'>
          <div className='mb-2 md:mb-0 md:mr-2 md:w-full'>
            <label htmlFor='last_name' className='mb-1 block'>
              姓*
            </label>
            <input
              id='last_name'
              name='last_name'
              placeholder='Last Name'
              value={client.last_name}
              type='text'
              className='w-full border border-slate-200 p-4'
              onChange={(e) => setClient((prev) => ({ ...prev, last_name: e.target.value }))}
            />
          </div>
          <div className='md:w-full'>
            <label htmlFor='first_name' className='mb-1 block'>
              名*
            </label>
            <input
              id='first_name'
              name='first_name'
              placeholder='First Name'
              value={client?.first_name}
              type='text'
              className='w-full border border-slate-200 p-4'
              onChange={(e) => setClient((prev) => ({ ...prev, first_name: e.target.value }))}
            />
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
              value={client?.phone}
              placeholder='09********'
              type='text'
              className='w-full border border-slate-200 p-4'
              onChange={(e) => setClient((prev) => ({ ...prev, phone: e.target.value }))}
            />
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor='birthday' className='mb-1 block'>
            生日*
          </label>
          <input
            id='birthday'
            name='birthday'
            type='date'
            value={client.birthday?.split('T')[0]}
            className='w-full border border-slate-200 p-4'
            onChange={(e) => setClient((prev) => ({ ...prev, birthday: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor=''>國家</label>
          <select
            name='country'
            id='country'
            className='w-full border border-slate-200 p-4'
            value={client?.country}
            onChange={(e) => setClient((prev) => ({ ...prev, country: e.target.value }))}>
            <option value='TW'>Taiwan</option>
            <option value='JP'>Japan</option>
            <option value='AS'>American Samoa</option>
          </select>
        </div>
        <div className='mb-4 '>
          <label htmlFor='city' className='mb-1 block'>
            城市
          </label>
          <input
            id='city'
            name='city'
            placeholder='City'
            value={client?.city}
            type='text'
            className='w-full border border-slate-200 p-4'
            onChange={(e) => setClient((prev) => ({ ...prev, city: e.target.value }))}
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='birthday' className='mb-1 block'>
            電子載具
          </label>
          <input
            id='carrier_code'
            name='carrier_code'
            value={client?.carrier_code}
            type='text'
            className='w-full border border-slate-200 p-4'
            onChange={(e) => setClient((prev) => ({ ...prev, carrier_code: e.target.value }))}
          />
        </div>
        <button className='mb-4 rounded-lg bg-crimson px-6 py-3 text-xl text-black' onClick={onBtnUserEdit}>
          確認
        </button>
      </div>
    </div>
  );
};

export default UserDetailsEdit;
