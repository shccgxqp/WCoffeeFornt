import { useState } from 'react';
import PropTypes from 'prop-types';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

import { data, images } from '../constants';

const Navbar = (props) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { loggedIn, setLoggedIn } = props;

  const handleLogout = () => {
    setLoggedIn(false);
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <nav className='flex w-full items-center justify-between bg-crimson p-4 sm:px-8 sm:py-4'>
      <div className='hidden items-center justify-start sm:flex'>
        <img
          className='w-110 xl:w-210 '
          src={images.wangCoffee01}
          alt='app logo'
        />
      </div>

      <ul className='hidden flex-1 list-none items-center justify-center lg:flex'>
        {data.navItems.map((item, index) => (
          <li className='mx-4 my-0 cursor-pointer hover:text-grey' key={index}>
            <NavLink to={item.href}>{item.title}</NavLink>
          </li>
        ))}
      </ul>

      <div className='flex w-60 items-center justify-end'>
        {loggedIn ? (
          <>
            <NavLink
              to='/User'
              className='mx-4 my-0 border-golden transition duration-500 ease-in-out hover:border-b'>
              MyPage
            </NavLink>
            <NavLink
              to='/home'
              className='mx-4 my-0 border-golden transition duration-500 ease-in-out hover:border-b'
              onClick={handleLogout}>
              Log Out
            </NavLink>
            <div className='h-8 w-px bg-gray text-crimson'>|</div>
          </>
        ) : (
          <>
            <NavLink
              to='/login'
              className='mx-4 my-0 border-golden transition duration-500 ease-in-out hover:border-b'>
              Log In / Register
            </NavLink>
          </>
        )}
      </div>
      <div className='flex items-center justify-end'>
        <div className='flex sm:hidden'>
          <GiHamburgerMenu
            color='#0c0c0c'
            fontSize={27}
            onClick={() => setToggleMenu(true)}
          />
          {toggleMenu && (
            <div className='flex__center slide-bottom fixed left-0 top-0 z-20 h-screen w-full flex-col bg-crimson transition duration-500 ease-out'>
              <MdOutlineRestaurantMenu
                fontSize={27}
                className='absolute right-5 top-5 cursor-pointer text-27 text-black'
                onClick={() => setToggleMenu(false)}
              />
              <ul className='list-none'>
                {data.navItems.map((item, index) => (
                  <li
                    className='align-center m-8 cursor-pointer font-base text-4xl text-black hover:text-grey'
                    key={index}
                    onClick={() => setToggleMenu(false)}>
                    <NavLink to={item.href}>{item.title}</NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className='mx-4'>
          <NavLink to='/cart'>
            <FaShoppingCart className='text-2xl text-black' />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
};

export default Navbar;
