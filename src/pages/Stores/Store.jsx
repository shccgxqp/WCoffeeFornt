import { Link, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { Pagination } from '../../components';
import { NavLink } from 'react-router-dom';
import { shopItems } from '../../constants/data';

const Store = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const pageLimit = searchParams.get('limit') || '8';
  const category = searchParams.get('category');
  const [resMessage, setResMessage] = useState('');

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
    setResMessage(data.data.message);
    return data;
  };

  const data = useSWR(
    `${process.env.REACT_APP_API}/api/products/?page=${page}&limit=${pageLimit}&categoryId=${category}`,
    fetcher,
  );
  // if (data && data.data) console.log(data.data);

  return (
    <div className='mx-auto min-h-screen'>
      {data.data && (
        <>
          <div className='flex flex-row justify-center rounded-b-lg border-t-2 border-golden bg-crimson'>
            {shopItems.map((category) => (
              <NavLink
                className='text-md m-2 flex flex-wrap items-center justify-center gap-5 rounded-lg pb-2.5  pt-3 text-black hover:bg-golden'
                key={category.id}
                to={`/store/?page=1&limit=8&category=${category.id}`}>
                {category.icon}
                <span className=''>{category.name}</span>
              </NavLink>
            ))}
          </div>
          <div className={`text-center text-white ${resMessage === '沒有找到商品' ? 'bg-red-500 ' : 'bg-green-500 '}`}>
            {resMessage}
          </div>
          <div className=' grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {data.data &&
              data.data.data.products.map((item) => (
                <div key={item.id} className='mx-auto mt-4 max-w-sm overflow-hidden rounded-md shadow-md'>
                  <div className='flex h-56 w-full items-end justify-end '>
                    <img
                      className='h-full w-full object-cover'
                      src={`${process.env.REACT_APP_API}${item.image}`}
                      alt={item.name}
                    />
                    <Link
                      to={`/store/Purchase/${item.id}`}
                      className='mx-5 -mb-4 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-500 focus:bg-blue-500 focus:outline-none'>
                      <FaShoppingCart />
                    </Link>
                  </div>
                  <div className='px-5 py-3'>
                    <h3 className='text-gray-700 uppercase'>{item.name}</h3>
                    <span className='text-gray-500 mt-2'>${item.price}</span>
                  </div>
                </div>
              ))}
          </div>
          <Pagination
            allItems={data.data.data.totalCount}
            postsPerPage={parseInt(pageLimit)}
            currentPage={parseInt(page)}
            limit={parseInt(pageLimit)}
            category={parseInt(category)}
            url={'/store'}
          />
        </>
      )}
    </div>
  );
};
export default Store;
