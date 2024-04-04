import { NavLink, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import React from 'react';
import { shopItems } from '../../constants/data';
import { Pagination } from '../../components';
import { MdDelete, MdEdit, MdOutlineAddBox } from 'react-icons/md';
const AdminProduct = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const pageLimit = searchParams.get('limit') || '8';
  const category = searchParams.get('category');

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
    return data;
  };
  const data = useSWR(
    `${process.env.REACT_APP_API}/api/admin/products?page=${page}&limit=${pageLimit}&category=${category}`,
    fetcher,
  );
  if (data && data.data) console.log(data.data);

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('刪除訂單失敗');
      }
      alert('刪除訂單成功');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='min-h-screen px-4 py-4 2xl:container md:px-6 2xl:mx-auto 2xl:px-20'>
      {data.data && (
        <React.Fragment>
          <div className='flex flex-col'>
            <div key='category' className='flex flex-row justify-center'>
              {shopItems.map((category, index) => (
                <React.Fragment key={'category_' + index}>
                  <NavLink
                    className='text-md mr-4 flex flex-wrap items-center justify-center rounded-lg p-2 text-black hover:bg-golden'
                    to={`/admin/product/?page=1&limit=${pageLimit}&category=${category.id}`}>
                    {category.icon}
                    <span className=''>{category.name}</span>
                  </NavLink>
                </React.Fragment>
              ))}
              <NavLink
                className='text-md flex flex-wrap items-center justify-center rounded-lg  bg-green-300 p-2  text-black hover:bg-green-500'
                key='new'
                to={'/admin/product/create'}>
                <MdOutlineAddBox className='text-3xl' />
                <span>新增商品</span>
              </NavLink>
            </div>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='border-gray-200 dark:border-gray-700  ms:border overflow-hidden md:rounded-lg'>
                  <table className='ms:border w-full border-collapse border-slate-300'>
                    <thead className='divide-gray-200 dark:divide-gray-700 min-w-full divide-y'>
                      <tr>
                        <th className='text-gray-500 dark:text-gray-400 hidden px-4 py-3.5 text-left text-sm font-normal sm:block rtl:text-right'>
                          商品編號
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          圖片
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          名稱
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          種類
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          說明
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          價錢
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          修改
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 divide-y bg-white'>
                      {data.data.data &&
                        data.data.data.products.map((item) => (
                          <tr key={item.id}>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>{item.id}</td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              <img
                                className='h-10 w-10 object-cover'
                                src={`${process.env.REACT_APP_API}${item.image}`}
                                alt={item.name}
                              />
                            </td>
                            <td className='items-center whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              {item.name}
                            </td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>{item.category}</td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              {item.category === '咖啡豆' ? (
                                <React.Fragment key={item.name}>
                                  <p>
                                    <span>產地 :</span>
                                    {item.origin}
                                  </p>
                                  <p>
                                    <span>研磨度 :</span>
                                    {item.roast}
                                  </p>
                                </React.Fragment>
                              ) : (
                                <p>{item.category}</p>
                              )}

                              {item.description ? item.description : '無資料'}
                            </td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              {item.price + ' / ' + item.unit}
                            </td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              {' '}
                              <p className=' flex'>
                                修改 :
                                <NavLink to={`/admin/product/edit/${item.id}`}>
                                  <MdEdit className='ml-2 text-xl text-amber-500' />
                                </NavLink>
                              </p>
                              <p className='flex'>
                                刪除 :
                                <button onClick={() => handleDeleteProduct(item.id)}>
                                  <MdDelete className='ml-2 text-xl text-red-500' />
                                </button>
                              </p>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Pagination
            allItems={data.data.data.totalCount}
            postsPerPage={parseInt(pageLimit)}
            currentPage={parseInt(page)}
            limit={parseInt(pageLimit)}
            category={parseInt(category)}
            url={'/admin/product'}
          />
        </React.Fragment>
      )}
    </div>
  );
};
export default AdminProduct;
