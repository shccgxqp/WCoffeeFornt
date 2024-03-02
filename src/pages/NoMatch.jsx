import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const NoMatch = ({ message }) => {
  const handleGoBack = () => {
    window.history.goBack(); // 返回上一页
  };
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <h1 className='mb-8 text-4xl'>
        {' '}
        {message ? message : 'Page Not Found ಥ_ಥ!'}
      </h1>
      <Link to='/'>
        <button
          className='rounded bg-crimson px-4 py-2 leading-7 text-black'
          onClick={handleGoBack}>
          返回上一頁
        </button>
      </Link>
    </div>
  );
};

NoMatch.propTypes = {
  message: PropTypes.string,
};

export default NoMatch;
