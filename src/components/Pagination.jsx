import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const Pagination = ({ allItems, postsPerPage, setCurrentPage, currentPage }) => {
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
      <button
        className='mr-2 h-10 w-10 rounded-md border border-white bg-golden text-white outline-none'
        onClick={() =>
          setCurrentPage((prev) => {
            if (prev === 1) return prev;
            return prev - 1;
          })
        }>
        {'<'}
      </button>
      {displayPages.map((page, index) => (
        <button
          key={index}
          className={`h-10 w-10 rounded-md border border-white ${
            currentPage === page ? 'bg-white text-golden' : 'bg-golden text-white'
          } mr-2 outline-none`}
          onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
      <button
        className='h-10 w-10 rounded-md border border-white bg-golden text-white outline-none'
        onClick={() =>
          setCurrentPage((prev) => {
            if (prev === pages.length) return prev;
            return prev + 1;
          })
        }>
        {'>'}
      </button>
    </div>
  );
};

Pagination.propTypes = {
  allItems: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
