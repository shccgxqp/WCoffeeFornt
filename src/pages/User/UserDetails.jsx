import { FiEdit } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';
import { vipData, vipDataImg } from '../../helpers/translationHelpers';
import useSWR from 'swr';

const UserDetails = () => {
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

  const { data, error } = useSWR('http://localhost:3060/api/user', fetcher);
  if (error) return (window.location.href = '/login');
  if (!data) return <div className='mt-4 text-center'>loading...</div>;

  const formFields = [
    {
      label: 'VIP:',
      value: (
        <>
          <FaCrown className={vipDataImg(data.data.level)} />
          <p className='text-lg'>{vipData(data.data.level)}</p>
        </>
      ),
    },
    { label: 'Name:', value: `${data.data.last_name} ${data.data.first_name}` },
    { label: 'Birthday:', value: data.data.birthday.split('T')[0] },
    { label: '電子載具:', value: data.data.carrier_code },
    { label: 'Email:', value: data.data.email },
    { label: 'Phone:', value: data.data.phone },
    { label: '國家:', value: data.data.country },
    { label: '城市:', value: data.data.city },
  ];

  return (
    <div className='mx-auto max-w-3xl space-y-4 rounded-xl bg-white p-6'>
      {data && (
        <div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            {data &&
              formFields.map((field, index) => (
                <div key={index}>
                  <label className='text-lg font-bold'>{field.label}</label>
                  <div className='border-none bg-transparent text-lg focus:outline-none'>
                    {field.value}
                  </div>
                </div>
              ))}
          </div>
          <div className='mt-4'>
            <label className='text-lg font-bold'>Shipping Addresses:</label>
            <ul className='list-disc pl-4'>
              {data.data.Shipments.map((shipment) => (
                <li key={shipment.id} className='text-lg'>
                  {shipment.address}, {shipment.city}, {shipment.state}, {shipment.country}
                </li>
              ))}
            </ul>
          </div>
          <div className='mt-4 flex justify-end'>
            <button className='flex items-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
              <FiEdit className='mr-1' /> Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
