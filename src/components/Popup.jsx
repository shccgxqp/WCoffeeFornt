import { PropTypes } from 'prop-types';

const Popup = ({ children, show, onClose, successFunction }) => {
  if (!show) return null;
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='z-10 rounded bg-white shadow-lg'>
        <div className='p-4'>
          <button className='float-right text-black' onClick={onClose}>
            &times;
          </button>
          {children}
          <div className='mt-2  space-x-4 p-3 text-center md:block'>
            <button
              className='text-gray-600 hover:bg-gray-100 mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider shadow-sm hover:shadow-lg md:mb-0'
              onClick={onClose}>
              Cancel
            </button>
            <button
              className='mb-2 rounded-full border border-green-300 bg-green-300 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-green-500 hover:shadow-lg md:mb-0'
              onClick={successFunction}>
              確認訂購
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  successFunction: PropTypes.func.isRequired,
};
export default Popup;
