import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { NavLink } from 'react-router-dom';
const Pagination = ({ allItems, postsPerPage, currentPage, category, limit, url }) => {
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

  const mobilePage = (pages, currentPage) => {
    const index = pages.indexOf(currentPage);
    if (index === -1) {
      return [];
    }
    const startIndex = Math.max(0, index - 1);
    const endIndex = Math.min(pages.length - 1, index + 1);
    return pages.slice(startIndex, endIndex + 1);
  };

  const displayPages = isMobile ? mobilePage(pages, currentPage) : pages;
  return (
    <div className='pagination my-4 flex items-center justify-center'>
      <NavLink
        className='flex h-10 w-10 items-center justify-center rounded-md border border-white bg-golden text-white'
        to={`${url}/?page=${currentPage === 1 ? 1 : currentPage - 1}${limit ? '&limit=' + limit : ''}${category ? '&category=' + category : ''}`}>
        {'<'}
      </NavLink>
      {displayPages.map((page, index) => (
        <NavLink
          key={index}
          className={`h-10 w-10 rounded-md border border-white ${
            currentPage === page ? 'bg-while text-golden' : 'bg-golden text-white '
          } flex items-center justify-center`}
          to={`${url}/?page=${page}${limit ? '&limit=' + limit : ''}${category ? '&category=' + category : ''}`}>
          {page}
        </NavLink>
      ))}
      <NavLink
        className='flex h-10 w-10 items-center justify-center rounded-md border border-white bg-golden text-white'
        to={`${url}/?page=${currentPage === pages.length ? pages.length : currentPage + 1}${limit ? '&limit=' + limit : ''}${category ? '&category=' + category : ''}`}>
        {'>'}
      </NavLink>
    </div>
  );
};

Pagination.propTypes = {
  allItems: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  category: PropTypes.number,
  limit: PropTypes.number,
  url: PropTypes.string.isRequired,
};

export default Pagination;
