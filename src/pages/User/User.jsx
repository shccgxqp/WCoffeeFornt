import { useState } from 'react';

import { UserDetails, Order, OrderDetails } from '../../pages';
const User = () => {
  const [status, setStatus] = useState('UserDetails');
  const [orderId, setOrderId] = useState('1');
  const [OrderPage, setOrderPage] = useState(1);

  return (
    <>
      <div className='mx-20 mt-4 flex justify-center space-x-4 py-4'>
        <button
          className='btn focus:shadow-outline rounded bg-blue-500 px-4 py-2  text-white hover:bg-blue-600 focus:outline-none'
          onClick={() => setStatus('UserDetails')}>
          <span>User</span>
        </button>
        <button
          className='btn focus:shadow-outline rounded bg-green-500 px-4 py-2  text-white hover:bg-green-600 focus:outline-none'
          onClick={() => setStatus('Order')}>
          <span>Order</span>
        </button>
      </div>

      <div className='mx-20 mb-4 h-full '>
        {status === 'UserDetails' && <UserDetails />}
        {status === 'Order' && (
          <Order
            setStatus={setStatus}
            setOrderId={setOrderId}
            OrderPage={OrderPage}
            setOrderPage={setOrderPage}
          />
        )}
        {status === 'OrderDetails' && (
          <OrderDetails orderId={orderId} setStatus={setStatus} setOrderPage={setOrderPage} />
        )}
      </div>
    </>
  );
};
export default User;
