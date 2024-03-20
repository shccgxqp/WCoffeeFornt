import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Pagination, DropDownItem } from '../../components';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategoryId, setCurrentCategoryId] = useState('');
  const [resMessage, setResMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/api/products/?page=${currentPage}&limit=8&categoryId=${currentCategoryId}`,
        );
        const data = await response.json();
        if (data.status === 'error') {
          setResMessage(data.message);
          setTotalCount(data.data.totalCount);
          setProducts([]);
          return;
        } else {
          setResMessage('');
          setTotalCount(data.data.totalCount);
          setProducts(data.data.products);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [currentPage, currentCategoryId]);

  return (
    <div className='mx-auto'>
      <DropDownItem setCurrentCategoryId={setCurrentCategoryId} />
      {resMessage !== '' ? (
        <div className='mt-4 h-screen text-center text-red-500'>{resMessage}</div>
      ) : (
        <>
          <div className='px- mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {products.map((item) => (
              <div key={item.id} className='mx-auto mt-4 max-w-sm overflow-hidden rounded-md shadow-md'>
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
        </>
      )}
      <Pagination allItems={totalCount} currentPage={currentPage} setCurrentPage={setCurrentPage} postsPerPage={8} />
    </div>
  );
};
export default Store;
