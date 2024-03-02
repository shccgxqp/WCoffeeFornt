import { useState, useEffect } from 'react';
import { setCookie, getCookie } from '../helpers/cookieHelpers';

const Car = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const existingCart = JSON.parse(getCookie('cart') || '[]');
    setCart(existingCart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    setCookie('cart', JSON.stringify(updatedCart), 1);
  };

  const totalAmount = cart.reduce((total, item) => {
    return total + parseFloat(item.price) * parseInt(item.quantity);
  }, 0);

  return (
    <div className='mx-auto mt-8 w-[600px]'>
      <h1 className='mb-4 text-2xl font-semibold'>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between border-b py-4'>
              <div>
                <p className='font-semibold'>{item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                className='text-red-500 hover:text-red-700 focus:outline-none'
                onClick={() => removeFromCart(index)}>
                Remove
              </button>
            </div>
          ))}
          <div className='mt-4'>
            <p className='font-semibold'>
              Total Amount: ${totalAmount.toFixed(2)}
            </p>
            <button className='rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none'>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Car;
