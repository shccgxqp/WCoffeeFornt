import { NavLink, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import React from 'react';
import { zipCode } from '../../constants/data';
import { Pagination } from '../../components';
import { MdDelete, MdEdit } from 'react-icons/md';
const AdminOrder = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';
  const pageLimit = searchParams.get('limit') || '8';

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

  const data = useSWR(`${process.env.REACT_APP_API}/api/admin/orders?page=${page}&limit=${pageLimit}`, fetcher);
  // if (data && data.data) console.log(data.data);

  const handleCancelOrder = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/admin/orders/cancel/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('取消訂單失敗');
      }
      alert('作廢訂單成功');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteOrder = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/admin/orders/${id}`, {
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
        <>
          <div className='flex flex-col'>
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
                          客戶資料
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          狀態
                        </th>

                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          商品資料
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          配送資料
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          修改訂單
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 divide-y bg-white'>
                      {data.data.data.orders &&
                        data.data.data.orders.map((user) => (
                          <tr key={user.id}>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>{user.id}</td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              <p>
                                <span>姓名 : </span>
                                {user.LastName + user.FirstName}
                              </p>
                              <p>
                                <span>信箱 : </span>
                                {user.UserEmail}
                              </p>
                            </td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium '>
                              <p>
                                <span>付款狀態 : </span>
                                {user.payment_status}
                              </p>
                              <p>
                                <span>訂單備註 : </span>
                                {user.comments || '無備註'}
                              </p>
                              <p>
                                <span>訂單作廢 : </span>
                                {user.cancel ? user.cancel.split('T')[0] : '否'}
                              </p>
                            </td>

                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              {user.OrderItemsProduct.map((item) => (
                                <React.Fragment key={user.id + item.name}>
                                  <p className='bg-red-100'>
                                    <span>商品名稱 : </span>
                                    {item.name}
                                  </p>
                                  <div className='flex'>
                                    <p className='mr-2'>
                                      <span>數量 : </span>
                                      {item.qty}
                                    </p>
                                    <p>
                                      <span>單價 : </span>
                                      {item.price}
                                    </p>
                                  </div>
                                </React.Fragment>
                              ))}
                              <p className='bg-green-100'>
                                <span>小計 : </span> {user.total}
                              </p>
                            </td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              <p>
                                <span>配送名稱 : </span> {user.Shipment.state}
                              </p>
                              <p>
                                <span>配送方式</span> {zipCode(user.Shipment.zip_code)}
                              </p>
                              <p>
                                <span>地址 : </span>
                                {user.Shipment.address}
                              </p>
                            </td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              <p className='mb-2 flex'>
                                修改 :
                                <NavLink>
                                  <MdEdit className='ml-2 text-xl text-amber-500' />
                                </NavLink>
                                {/* <NavLink to={`/admin/order/edit/${user.id}`}>
                                  <MdEdit className='ml-2 text-xl text-amber-500' />
                                </NavLink> */}
                              </p>
                              <p className='mb-2 flex'>
                                作廢 :
                                <button onClick={() => handleCancelOrder(user.id)}>
                                  <MdDelete className='ml-2 text-xl text-red-300' />
                                </button>
                              </p>
                              <p className='flex'>
                                刪除 :
                                <button onClick={() => handleDeleteOrder(user.id)}>
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
            category={null}
            limit={parseInt(pageLimit)}
            url={'/admin/order'}
          />
        </>
      )}
    </div>
  );
};

export default AdminOrder;
