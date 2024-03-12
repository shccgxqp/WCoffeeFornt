import useSWR from 'swr';

const Admin = () => {
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

  const { data, error, isLoading } = useSWR(
    `${process.env.REACT_APP_API}/api/admin/products/?page=1&limit=8`,
    fetcher,
  );
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className='flex'>
      <div className=''>
        <h1 className='bg-red-500'>123</h1>
      </div>
    </div>
  );
};
export default Admin;
