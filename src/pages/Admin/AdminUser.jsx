import useSWR from 'swr';
import { NavLink } from 'react-router-dom';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { RiExchangeLine } from 'react-icons/ri';
const AdminUser = () => {
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
  const data = useSWR(`${process.env.REACT_APP_API}/api/admin/users`, fetcher);
  // if (data && data.data) console.log(data.data.data);

  const handleToggleAdmin = async (id, isAdmin) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isAdmin: !isAdmin }),
        credentials: 'include',
        mode: 'cors',
      });
      if (!response.ok) {
        throw new Error('修改權限失敗');
      }
      window.location.reload();
    } catch (error) {
      console.error('修改權限失敗:', error);
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
                          使用者編號
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          名稱
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          信箱
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          電話
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          管理員身分
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          生日
                        </th>
                        <th className='text-gray-500 dark:text-gray-400 px-4 py-3.5 text-left text-sm font-normal rtl:text-right'>
                          發送優惠信件
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 divide-y bg-white'>
                      {data.data.data &&
                        data.data.data.map((user) => (
                          <tr key={user.id}>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>{user.id}</td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              {user.last_name + user.first_name}
                            </td>
                            <td className='hidden whitespace-nowrap px-4 py-4 text-sm font-medium sm:block'>
                              {user.email}
                            </td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              {user.phone ? user.phone : '無資料'}
                            </td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              <span
                                className={`inline-flex items-center gap-1 rounded-full  px-2 py-1 text-xs font-semibold ${user.isAdmin ? 'bg-indigo-50 text-indigo-600' : 'bg-red-50 text-red-600'}`}>
                                {user.isAdmin ? 'true' : 'false'}
                              </span>
                              <button onClick={() => handleToggleAdmin(user.id, user.isAdmin)}>
                                <RiExchangeLine />
                              </button>
                            </td>
                            <td className='whitespace-nowrap px-4 py-4 text-sm font-medium'>
                              {user.birthday ? user.birthday.split('T')[0] : '無資料'}
                            </td>
                            <td>
                              <NavLink to={`/admin/sendEmail/${user.id}`}>
                                <MdOutlineMarkEmailRead />
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
    </div>
  );
};

export default AdminUser;
