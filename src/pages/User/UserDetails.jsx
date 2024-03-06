import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

const UserDetails = () => {
  const navigate = useNavigate();

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
  if (error) return navigate('/login');
  if (!data) return <div>loading...</div>;

  return (
    <div>
      {data && (
        <div>
          <p>Name: {data.data.name}</p>
          <p>Email: {data.data.email}</p>
        </div>
      )}
      <div>User Details</div>
    </div>
  );
};

export default UserDetails;
