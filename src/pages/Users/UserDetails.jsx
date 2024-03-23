import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { vipData, vipDataImg } from '../../helpers/translationHelpers';
import { FiEdit } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import useSWR from 'swr';

const UserDetails = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetcher = async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  };

  const { data, error } = useSWR(`${process.env.REACT_APP_API}/api/user`, fetcher);
  if (error) return (window.location.href = '/login');
  if (!data) return <div className='mt-4 text-center'>loading...</div>;

  const formFields = [
    {
      label: 'VIP:',
      value: (
        <>
          <FaCrown className={vipDataImg(data.data.level)} />
          <p className='text-lg'>{vipData(data.data.level)}</p>
        </>
      ),
    },
    { label: '名子:', value: `${data.data.last_name} ${data.data.first_name}` },
    { label: '生日:', value: data.data.birthday ? data.data.birthday.split('T')[0] : '無' },
    { label: '電子載具:', value: data.data.carrier_code ? data.data.carrier_code : '無' },
    { label: '信箱:', value: data.data.email ? data.data.email : '無' },
    { label: '電話:', value: data.data.phone ? data.data.phone : '無' },
    { label: '國家:', value: data.data.country ? data.data.country : '無' },
    { label: '城市:', value: data.data.city ? data.data.city : '無' },
  ];

  const handleCheckboxChange = (e) => {
    const { id } = e.target;
    setSelectedId(id);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      if (checkbox.id !== id) {
        checkbox.checked = false;
      }
    });
  };

  const onBtnShipmentDelete = () => {
    if (selectedId) {
      fetch(`http://localhost:3060/api/user/shipment/${selectedId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      })
        .then((response) => {
          if (response.ok) window.location.reload();
          else return response.json();
        })
        .then((data) => {
          setErrorMessage(data.message);
        })
        .catch((error) => {
          console.error('請求時發生錯誤', error);
        });
    }
  };

  return (
    <div className='mx-auto max-w-3xl space-y-4 rounded-xl bg-white p-6'>
      {data && (
        <div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {data &&
              formFields.map((field, index) => (
                <div key={index}>
                  <label className='text-lg font-bold'>{field.label}</label>
                  <div className='border-none bg-transparent text-lg focus:outline-none'>{field.value}</div>
                </div>
              ))}
          </div>
          <div className='mx-auto mt-4 flex'>
            <NavLink
              to='/user/edit'
              className='flex w-full flex-row justify-center rounded bg-blue-500 p-2 text-center text-white hover:bg-blue-600'>
              <FiEdit className='mr-1' /> 編輯個人資料
            </NavLink>
          </div>
          <div className='block w-full overflow-x-auto'>
            <table className='w-full border-collapse items-center border'>
              <caption className='caption-top px-6 py-3'>配送資訊</caption>
              <thead>
                <tr>
                  <th className='ms:px-6 border border-x-0 border-solid px-2 py-3 text-left'></th>
                  <th className='ms:px-6 border border-x-0 border-solid px-2 py-3 text-left uppercase'>配送名稱</th>
                  <th className='ms:block ms:px-6  hidden border border-x-0 border-solid px-2 py-3 text-left uppercase'>
                    國家
                  </th>
                  <th className='ms:block ms:px-6 hidden border border-x-0 border-solid  px-2 py-3 text-left uppercase'>
                    城市
                  </th>
                  <th className='ms:px-6 border border-x-0 border-solid px-2 py-3 text-left uppercase'>地址</th>
                </tr>
              </thead>
              <tbody>
                {data.data.Shipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td className='border-x-0 border-t-0 p-4 px-6'>
                      <input
                        id={shipment.id}
                        type='checkbox'
                        onChange={handleCheckboxChange}
                        className='class="form-checkbox text-yellow-600" h-5 w-5'></input>
                    </td>
                    <td className='border-x-0 border-t-0 p-4 px-6'>{shipment.state}</td>
                    <td className='ms:block hidden border-x-0 border-t-0 p-4 px-6'>{shipment.country}</td>
                    <td className='ms:block hidden border-x-0 border-t-0 p-4 px-6'>{shipment.city}</td>
                    <td className='border-x-0 border-t-0 p-4 px-6'>{shipment.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className='text-red-500'>{errorMessage}</p>
          </div>
          <div className='mt-4 grid grid-cols-3 '>
            <NavLink
              to='/user/shipment/?add=true&id=null'
              className='mt-4 flex flex-row justify-center rounded bg-green-500 p-2 text-center text-white hover:bg-green-600'>
              <FiEdit className='mr-1' /> 新增配送資料
            </NavLink>
            <NavLink
              to={selectedId ? `/user/shipment/?add=false&id=${selectedId}` : ''}
              className='mt-4 flex flex-row justify-center rounded bg-yellow-500 p-2 text-center text-white hover:bg-yellow-600'>
              <FiEdit className='mr-1' /> 修改
            </NavLink>
            <button
              className='mt-4 flex flex-row justify-center rounded bg-red-500 p-2 text-center text-white hover:bg-red-600'
              onClick={onBtnShipmentDelete}>
              刪除
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
