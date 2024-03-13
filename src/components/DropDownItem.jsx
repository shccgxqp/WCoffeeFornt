import PropTypes from 'prop-types';
// import { NavLink } from 'react-router-dom';
import { data } from '../constants';
const DropDownItem = ({ setCurrentCategoryId }) => {
  return (
    <div className='flex flex-row justify-center rounded-b-lg border-t-2 border-golden bg-crimson'>
      {data.shopItems.map((category) => (
        <button
          className='text-md m-2 flex flex-wrap items-center justify-center gap-5 rounded-lg pb-2.5  pt-3 text-black hover:bg-golden'
          key={category.id}
          to={`/store/${category.name}`}
          onClick={() => setCurrentCategoryId(category.id)}>
          {category.icon}
          <span className=''>{category.name}</span>
        </button>
      ))}
    </div>
  );
};
DropDownItem.propTypes = {
  setCurrentCategoryId: PropTypes.func,
};

export default DropDownItem;
