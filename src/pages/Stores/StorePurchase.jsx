import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getCookie, setCookie } from '../../helpers/cookieHelpers';
import { FaRegStar, FaStar, FaFacebook, FaGoogle, FaInstagram, FaHeart } from 'react-icons/fa';

const StorePurchase = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [resMessage, setResMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
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
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: parseInt(quantity),
    };
    const existingCart = JSON.parse(getCookie('cart') || '[]');
    const updatedCart = [...existingCart, cartItem];
    setCookie('cart', JSON.stringify(updatedCart), 1);
    window.location.href = '/store';
  };

  return (
    <>
      <section className='text-gray-700 body-font min-h-screen overflow-hidden bg-white'>
        {product && (
          <div className='container mx-auto px-5 py-24'>
            <div className='mx-auto flex flex-wrap lg:w-4/5'>
              <img
                alt='Product image'
                className='border-gray-200 w-full rounded border object-cover object-center lg:w-1/2'
                src={`${process.env.REACT_APP_API}/images/${product.image}.jpg`}
              />
              <div className='mt-6 w-full lg:mt-0 lg:w-1/2 lg:py-6 lg:pl-10'>
                <h2 className='title-font text-3xl font-medium text-red-500'>{resMessage}</h2>
                <h2 className='title-font text-gray-500 text-sm tracking-widest'>
                  {product.Category}
                  <a href='/store' className='ml-2 text-blue-500'>
                    返回
                  </a>
                </h2>
                <h1 className='text-gray-900 title-font mb-1 text-3xl font-medium'>{product.name}</h1>
                <div className='mb-4 flex'>
                  <span className='flex items-center'>
                    <FaStar className=' text-yellow-500' />
                    <FaStar className=' text-yellow-500' />
                    <FaStar className=' text-yellow-500' />
                    <FaStar className=' text-yellow-500' />
                    <FaRegStar className=' text-yellow-500' />
                    <span className='text-gray-600 ml-3'>4 Reviews</span>
                  </span>
                  <span className='border-gray-200 ml-3 flex border-l-2 py-2 pl-3'>
                    <a className='text-gray-500'>
                      <FaFacebook />
                    </a>
                    <a className='text-gray-500 ml-2'>
                      <FaGoogle />
                    </a>
                    <a className='text-gray-500 ml-2'>
                      <FaInstagram />
                    </a>
                  </span>
                </div>
                <p className='leading-relaxed'>
                  {product.description}
                  `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi at repellendus officia, eveniet
                  incidunt autem animi dolore veritatis, ipsa dicta ullam, ipsum magni unde. Deleniti ut enim
                  praesentium eligendi illo!`
                </p>
                <div className='border-gray-200 mb-5 mt-6 flex items-center border-b-2 pb-5'>
                  <div className='flex'>
                    <span className='mr-3'>顏色</span>
                    <button className='border-gray-300 h-6 w-6 rounded-full border-2 focus:outline-none'></button>
                    <button className='border-gray-300 bg-gray-700 ml-1 h-6 w-6 rounded-full border-2 focus:outline-none'></button>
                    <button className='border-gray-300 ml-1 h-6 w-6 rounded-full border-2 bg-red-500 focus:outline-none'></button>
                  </div>
                  <div className='ml-6 flex items-center'>
                    <span className='mr-3'>數量</span>
                    <div className='relative'>
                      <input
                        className='border-gray-400 w-24 rounded border py-2 pl-3 pr-5 text-base focus:border-red-500 focus:outline-none'
                        type='number'
                        id='quantity'
                        min={1}
                        defaultValue='1'
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className='flex'>
                  <span className='title-font text-gray-900 text-2xl font-medium'>${product.price * quantity}</span>
                  <button
                    className='ml-auto flex rounded border-0 bg-red-500 px-6 py-2 text-white hover:bg-red-600 focus:outline-none'
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart();
                    }}>
                    加入購物車
                  </button>
                  <button className='bg-gray-200 text-gray-500 ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-0 p-0'>
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default StorePurchase;
