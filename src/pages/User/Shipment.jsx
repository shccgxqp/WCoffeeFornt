import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Shipment = () => {
  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get('id') || '';
  const selectedAdd = searchParams.get('add') || 'true';
  const [shipment, setShipment] = useState({
    state: '',
    country: '',
    city: '',
    address: '',
  });

  const items = [
    {
      id: 1,
      name: 'state',
      labelName: '貨運名稱*',
      placeholder: '名稱',
    },
    {
      id: 2,
      name: 'country',
      labelName: '國家*',
      placeholder: '國家',
    },
    {
      id: 3,
      name: 'city',
      labelName: '城市*',
      placeholder: '城市',
    },
    {
      id: 4,
      name: 'address',
      labelName: '地址*',
      placeholder: '地址',
    },
  ];

  useEffect(() => {
    const url = `http://localhost:3060/api/user/shipment/${selectedId}`;
    if (selectedAdd === 'false') {
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      }).then((response) => {
        response.json().then((data) => {
          if (!response.ok) throw new Error(data.message);
          setShipment(data.data);
        });
      });
    }
  }, [selectedAdd, selectedId]);

  const onBtnShipmentSubmit = () => {
    if (selectedAdd === 'false' && selectedId === 'null') window.location.href = '/user';
    const url = `http://localhost:3060/api/user/shipment/${selectedAdd === 'true' ? '' : selectedId}`;
    fetch(url, {
      method: selectedAdd === 'true' ? 'POST' : 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      mode: 'cors',
      body: JSON.stringify({ ...shipment, zip_code: 1 }),
    }).then((response) => {
      response.json().then((data) => {
        if (!response.ok) throw new Error(data.message);
        window.location.href = '/user';
      });
    });
  };

  return (
    <>
      <h1 className='my-8 text-center'>配送清單</h1>
      <div className='mx-auto flex  w-1/2 flex-col items-center justify-center'>
        {items.map((item) => (
          <div key={item.id} className='mb-4 w-full'>
            <label htmlFor={item.name} className='mb-1 block'>
              {item.labelName}
            </label>
            <input
              id={item.name}
              name={item.name}
              placeholder={item.name}
              value={shipment[item.name]}
              type='text'
              className='w-full border border-slate-200 p-4'
              onChange={(e) => setShipment((prev) => ({ ...prev, [item.name]: e.target.value }))}
            />
          </div>
        ))}
        <button className='border border-slate-200 p-4' onClick={onBtnShipmentSubmit}>
          送出
        </button>
      </div>
    </>
  );
};
export default Shipment;
