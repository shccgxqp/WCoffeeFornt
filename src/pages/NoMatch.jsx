import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='mb-8 text-4xl'>Page Not Found ಥ_ಥ!</h1>
      <Link to='/'>
        <button className='rounded bg-crimson px-4 py-2 leading-7 text-black'>
          Go to the home page
        </button>
      </Link>
    </div>
  );
};

export default NoMatch;
