import useSWR from 'swr';
import { NavLink, useSearchParams } from 'react-router-dom';
import { SiHackthebox } from 'react-icons/si';
import { Pagination } from '../../components';

const Order = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const pageLimit = 8;

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
  const { data, error } = useSWR(
    `${process.env.REACT_APP_API}/api/user/orders/?page=${page}&limit=${pageLimit}`,
    fetcher,
  );
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  // console.log(data.data.orders);
  return (
    <div className='min-h-screen px-4 py-14 2xl:container md:px-6 2xl:mx-auto 2xl:px-20'>
      {data.data.orders && (
        <>
          <div className='mt-6 flex flex-col'>
            <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='border-gray-200 dark:border-gray-700  ms:border overflow-hidden md:rounded-lg'>
                  <table className='ms:border w-full border-collapse border-slate-300'>
                    <thead className='divide-gray-200 dark:divide-gray-700 min-w-full divide-y'>
                      <tr>
                        <th className='text-gray-500 dark:text-gray-400 hidden px-4 py-3.5 text-left text-sm font-normal sm:block rtl:text-right'>
                          訂單編號
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          訂單日期
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          訂單狀況
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          訂單金額
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          付款狀態
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          查看訂單
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 divide-y bg-white'>
                      {data.data.orders.map((order) => (
                        <tr key={order.id}>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>{order.id}</td>
                          <td className='hidden whitespace-nowrap px-4 py-4 text-sm font-medium sm:block'>
                            {order.created_at.split('T')[0]}
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                            {order.status}
                            <span className='block sm:hidden'> {order.created_at.split('T')[0]}</span>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>{order.total}</td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                            <span
                              className={`inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold ${order.payment_status === '已付款' ? 'bg-indigo-50 text-indigo-600' : 'bg-red-50 text-red-600'}`}>
                              {order.payment_status ? order.payment_status : '未付款'}
                            </span>
                          </td>
                          <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                            <NavLink
                              to={`/user/order/details/${order.id}`}
                              className='text-blue-500 hover:text-blue-700'>
                              <span className='flex items-center'>
                                <SiHackthebox />
                                查看訂單
                              </span>
                            </NavLink>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Pagination
        allItems={data.data.totalCount}
        postsPerPage={pageLimit}
        currentPage={parseInt(page)}
        url={'/user/order'}
      />
    </div>
  );
};

export default Order;
