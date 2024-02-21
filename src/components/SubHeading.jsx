import { images } from '../constants';

import PropTypes from 'prop-types';

const SubHeading = ({ title }) => (
  <div className='mb-4'>
    <p className=' font-base font-semibold uppercase tracking-wide text-black md:text-xl xl:text-3xl'>
      {title}
    </p>
    <img className='w-20' src={images.spoon} alt='spoon_image' />
  </div>
);

SubHeading.propTypes = {
  title: PropTypes.string,
};

export default SubHeading;
