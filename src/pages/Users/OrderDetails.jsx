import { useParams } from 'react-router-dom';
import useSWR from 'swr';

const OrderDetails = () => {
  const { id } = useParams();

  const fetcher = async (url) => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  };
  const { data, error } = useSWR(`${process.env.REACT_APP_API}/api/user/orders/${id}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  let orderItems = data.data[0];
  return (
    <div>
      {data && (
        <div key={data.data.id} className='px-4 py-14 2xl:container md:mx-auto md:px-20 '>
          <div className='item-start flex flex-col justify-start space-y-2 '>
            <h1 className='text-gray-800 text-3xl font-semibold leading-7 lg:text-4xl lg:leading-9 dark:text-white'>
              訂單編號 : {orderItems.id}
              <button className='ml-8 text-blue-500' onClick={() => window.history.back()}>
                返回
              </button>
            </h1>
            <p className='dark:text-gray-300 text-gray-600 text-base font-medium leading-6'>
              下單日期 : {orderItems.created_at.split('T')[0]}
            </p>
          </div>
          <div className='w-full '>
            {orderItems.OrderItemsProduct.map((item, index) => (
              <div
                key={index}
                className='mt-4 flex w-full flex-col items-start justify-start md:mt-6 md:flex-row md:items-center md:space-x-6 xl:space-x-8'>
                <div className='w-full pb-4 md:w-40 md:pb-8 '>
                  <img className='w-full ' src={`${process.env.REACT_APP_API}/images/${item.image}.jpg`} alt='dress' />
                </div>
                <div className='border-gray-200 flex w-full flex-col items-start justify-between space-y-4 border-b pb-8 md:flex-row md:space-y-0'>
                  <div className='flex w-full flex-col items-start justify-start space-y-8'>
                    <h3 className='text-gray-800 text-xl font-semibold leading-6 xl:text-2xl '>{item.name}</h3>
                    <div className='flex flex-col items-start justify-start space-y-2'>
                      <p className='text-gray-800 text-sm leading-none '>
                        <span className='dark:text-gray-400 text-gray-300'>weight: </span>
                        {item.weight}
                      </p>
                      <p className='text-gray-800 text-sm leading-none '>
                        <span className='dark:text-gray-400 text-gray-300'>roast: </span>
                        {item.roast}
                      </p>
                    </div>
                  </div>
                  <div className='flex w-full items-start justify-between space-x-8'>
                    <p className='text-base leading-6 xl:text-lg '>${item.price}</p>
                    <p className='text-gray-800 text-base leading-6 xl:text-lg '>{item.qty}</p>
                    <p className='text-gray-800 text-base font-semibold leading-6 xl:text-lg '>
                      ${item.price * item.qty}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div className='flex w-full flex-col items-stretch justify-center space-y-4 md:flex-row md:space-x-6 md:space-y-0 xl:space-x-8'>
              <div className='bg-gray-50  flex w-full flex-col space-y-6 px-4 py-6 md:p-6 xl:p-8'>
                <h3 className='text-gray-800 text-xl font-semibold leading-5 '>付款資訊</h3>
                <div className='border-gray-200 flex w-full flex-col items-center justify-center space-y-4 border-b pb-4'>
                  <div className='flex w-full justify-between'>
                    <p className='text-gray-800 text-base leading-4 '>付款方式 :</p>
                    <p className=' text-gray-600 text-base leading-4'>{orderItems.payment_type}</p>
                  </div>
                  <div className='flex w-full items-center justify-between'>
                    <p className='text-gray-800 text-base leading-4'>付款帳號 :</p>

                    <p className='text-gray-600 text-base leading-4'>
                      {orderItems.payment_act &&
                        (orderItems.payment_act.length === 5
                          ? orderItems.payment_act
                          : orderItems.payment_act
                              .replace(/(\d{4})(\d{2})(\d{4})/, '$1-$2**-****-$3')
                              .replace(/(.{4})(?=.)/g, '$1-'))}
                    </p>
                  </div>
                  <div className='flex w-full items-center justify-between'>
                    <p className='text-gray-800 text-base leading-4 '>付款銀行 :</p>
                    <p className='text-gray-600 text-base leading-4'>{orderItems.payment_bank}</p>
                  </div>
                </div>
                <div className='flex w-full items-center justify-between'>
                  <p className='text-gray-800 text-base font-semibold leading-4 '>付款狀態 :</p>
                  <p className=' text-gray-600 text-base font-semibold leading-4'>{orderItems.payment_status}</p>
                </div>
              </div>
              <div className='bg-gray-50  flex w-full flex-col space-y-6 px-4 py-6 md:p-6 xl:p-8'>
                <h3 className='text-gray-800 text-xl font-semibold leading-5 '>金額總結</h3>
                <div className='border-gray-200 flex w-full flex-col items-center justify-center space-y-4 border-b pb-4'>
                  <div className='flex w-full justify-between'>
                    <p className='text-gray-800 text-base leading-4 '>未稅價 :</p>
                    <p className=' text-gray-600 text-base leading-4'>${orderItems.sub_total}</p>
                  </div>
                  <div className='flex w-full items-center justify-between'>
                    <p className='text-gray-800 text-base leading-4'>折扣</p>
                    <p className='text-gray-600 text-base leading-4'>-$0.00 (0%)</p>
                  </div>
                  <div className='flex w-full items-center justify-between'>
                    <p className='text-gray-800 text-base leading-4 '>運費+服務費 :</p>
                    <p className='text-gray-600 text-base leading-4'>
                      ${orderItems.total - orderItems.sub_total} (10%)
                    </p>
                  </div>
                </div>
                <div className='flex w-full items-center justify-between'>
                  <p className='text-gray-800 text-base font-semibold leading-4 '>總價 :</p>
                  <p className=' text-gray-600 text-base font-semibold leading-4'>${orderItems.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
