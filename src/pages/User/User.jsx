import { useState } from 'react';

import { UserDetails, Order, Shipment } from '../../pages';
const User = () => {
  const [status, setStatus] = useState('UserDetails');

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  return (
    <>
      <div className='mt-4 flex justify-center space-x-4'>
        <button
          className='btn focus:shadow-outline rounded bg-blue-500 px-4 py-2  text-white hover:bg-blue-600 focus:outline-none'
          onClick={() => handleStatusChange('UserDetails')}>
          <span>User</span>
        </button>
        <button
          className='btn focus:shadow-outline rounded bg-green-500 px-4 py-2  text-white hover:bg-green-600 focus:outline-none'
          onClick={() => handleStatusChange('Order')}>
          <span>Order</span>
        </button>
        <button
          className='btn focus:shadow-outline rounded bg-purple-500 px-4 py-2  text-white hover:bg-purple-600 focus:outline-none'
          onClick={() => handleStatusChange('Shipment')}>
          <span>Shipment</span>
        </button>
      </div>

      <div className='mx-3 my-4 h-96 border'>
        {status === 'UserDetails' && <UserDetails />}
        {status === 'Order' && <Order />}
        {status === 'Shipment' && <Shipment />}
      </div>
    </>
  );
};
export default User;
