import PropTypes from 'prop-types'; // Import PropTypes

const Pagination = ({
  allProducts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  //計算看看有幾頁
  let pages = [];

  for (let i = 1; i <= Math.ceil(allProducts / postsPerPage); i++) {
    pages.push(i);
  }
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
      {pages.map((page, index) => (
        <button
          key={index}
          className={`h-10 w-10 rounded-md border border-white ${
            currentPage === page
              ? 'bg-white text-golden'
              : 'bg-golden text-white'
          } mr-2 outline-none`}
          onClick={() => setCurrentPage(page)}>
          {page}
        </button>
      ))}
      <button
        className='ml-2 h-10 w-10 rounded-md border border-white bg-golden text-white outline-none'
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
  allProducts: PropTypes.number.isRequired,
  postsPerPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
