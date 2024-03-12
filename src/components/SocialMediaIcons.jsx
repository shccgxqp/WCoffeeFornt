import { FaInstagram, FaFacebook, FaYoutube, FaTimes } from 'react-icons/fa';

const SocialMediaIcons = () => {
  return (
    <div className='hidden items-center md:flex md:flex-col'>
      <div className='fixed right-3 top-1/3 items-center rounded-lg bg-golden p-2 shadow-lg lg:p-4'>
        <div className='rotate-180 ' style={{ writingMode: 'vertical-rl' }}>
          FOLLOW US
        </div>
        <div className='mt-3 flex cursor-pointer flex-col gap-2'>
          <FaInstagram className='text-2xl text-blue-500' />
          <FaFacebook className='text-2xl text-blue-500' />
          <FaYoutube className='text-2xl text-red-500' />
          <FaTimes className='text-gray-500 text-2xl' />
        </div>
      </div>
    </div>
  );
};

export default SocialMediaIcons;
