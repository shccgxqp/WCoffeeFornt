import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetails } from '../../components';
import { getCookie, setCookie } from '../../helpers/cookieHelpers';

const StorePurchase = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [resMessage, setResMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResMessage(data.message);
        setProduct(data.data[0]);
      } catch (error) {
        console.error(error);
        setResMessage('Error fetching product data');
      }
    };
    fetchData();
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    const quantity = document.getElementById('quantity').value;
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: parseInt(quantity),
    };
    const existingCart = JSON.parse(getCookie('cart') || '[]');
    const updatedCart = [...existingCart, cartItem];
    setCookie('cart', JSON.stringify(updatedCart), 1);
    console.log('Item added to cart:', cartItem);
    window.location.href = '/store';
  };

  return (
    <div className='flex flex-col items-center'>
      {resMessage && <p className='text-red-500'>{resMessage}</p>}
      {product && (
        <div className='mt-6 rounded-md bg-white p-8 shadow-md'>
          <button
            onClick={() => {
              window.history.back();
            }}
            className='mb-4 cursor-pointer text-blue-500'>
            Back
          </button>
          <p className='mb-4 text-lg font-semibold'>Product Details</p>
          <ProductDetails product={product} />
          <form
            className='mt-4 flex items-center'
            onSubmit={(e) => {
              e.preventDefault();
              addToCart();
            }}>
            <label htmlFor='quantity' className='mr-2 font-semibold'>
              Quantity:
            </label>
            <input
              className='w-16 rounded-md border px-2 py-1'
              type='number'
              id='quantity'
              name='quantity'
              min='1'
              defaultValue='1'
            />
            <button
              type='submit'
              className='ml-4 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none'>
              Add to Cart
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StorePurchase;
