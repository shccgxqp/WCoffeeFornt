import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Pagination } from '../components';
import { NoMatch } from '../pages';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resMessage, setResMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3060/api/products/?page=${currentPage}&limit=8`,
        );
        const data = await response.json();
        setResMessage(data.message);
        if (data.data) {
          setTotalCount(data.data.totalCount);
          setProducts(data.data.products);
        } else {
          setTotalCount(0);
          setProducts([]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage]);
  return (
    <div className='mx-auto max-w-[1400px]'>
      {resMessage === '沒有找到商品' ? (
        <NoMatch message={resMessage} />
      ) : (
        <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {products.map((item) => (
            <div
              key={item.id}
              className='mx-auto mt-4 max-w-sm overflow-hidden rounded-md shadow-md'>
              <div className='flex h-56 w-full items-end justify-end '>
                <img
                  className='h-full w-full object-cover'
                  src={`http://localhost:3060/images/${item.image}.jpg`}
                  alt={item.name}
                />
                <Link
                  to={`/store/${item.id}`}
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
      )}

      {{ currentPage } && (
        <Pagination
          allProducts={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          postsPerPage={8}
        />
      )}
    </div>
  );
};
export default Store;
