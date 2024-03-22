import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { NavLink } from 'react-router-dom';
const Pagination = ({ allItems, postsPerPage, currentPage }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  let pages = [];
  for (let i = 1; i <= Math.ceil(allItems / postsPerPage); i++) {
    pages.push(i);
  }

  const displayPages = isMobile ? pages.slice(0, 3) : pages;

  return (
    <div className='pagination my-4 flex items-center justify-center'>
      <NavLink
        className='flex h-10 w-10 items-center justify-center rounded-md border border-white bg-golden text-white'
        to={`/user/order/?page=${() => (currentPage === 1 ? 1 : currentPage - 1)}`}>
        {'<'}
      </NavLink>
      {displayPages.map((page, index) => (
        <NavLink
          key={index}
          className={`h-10 w-10 rounded-md border border-white ${
            currentPage === page ? 'bg-while text-golden' : 'bg-golden text-white '
          } flex items-center justify-center`}
          to={`/user/order/?page=${page}`}>
          {page}
        </NavLink>
      ))}
      <NavLink
        className='flex h-10 w-10 items-center justify-center rounded-md border border-white bg-golden text-white'
        to={`user/order/?page=${() => (currentPage === pages.length ? pages.length : currentPage + 1)}`}>
        {'>'}
      </NavLink>
    </div>
  );
};

Pagination.propTypes = {
  allItems: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
