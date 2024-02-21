import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Store = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://fake-coffee-api.vercel.app/api?limit=8')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className='mx-auto flex w-[1400px]'>
      <h1>Store</h1>
      <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {data.map((item) => (
          <div
            key={item.id}
            className='mx-auto mt-4 max-w-sm overflow-hidden rounded-md shadow-md'>
            <div className='flex h-56 w-full items-end justify-end '>
              <img
                className='h-full  w-full'
                src={item.image_url}
                alt={item.name}
              />
              <Link
                to={`/store/${item._id}`}
                className='mx-5 -mb-4 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-500 focus:bg-blue-500 focus:outline-none'>
                <FaShoppingCart />
              </Link>
            </div>
            <div className='px-5 py-3'>
              <h3 className='text-gray-700 uppercase'>Classic watch</h3>
              <span className='text-gray-500 mt-2'>${item.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Store;
