import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";

import { data, images } from "../constants";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="flex justify-between items-center w-full p-4 sm:py-4 sm:px-8 bg-crimson">
      <div className="hidden sm:flex justify-start items-center">
        <img className="w-110 xl:w-210 " src={images.wangCoffee01} alt="app logo" />
      </div>

      <ul className="flex-1 hidden lg:flex justify-center  items-center list-none">
        {
          data.navItems.map((item, index) => (
            <li className="my-0 mx-4 cursor-pointer hover:text-grey" key={index}>
              <NavLink to={item.href}>{item.title}</NavLink>
            </li>
          ))
        }
      </ul>

      <div className="flex justify-end items-center">
        <a href="#login" className="my-0 mx-4 transition duration-500 ease-in-out hover:border-b border-golden">
          Log In / Register
        </a>
        <div className="w-px h-8 bg-gray text-crimson">|</div>
        <a href="/" className="my-0 mx-4 transition duration-500 ease-in-out hover:border-b border-golden">
          Book Table
        </a>
      </div>

      <div className="flex sm:hidden">
        <GiHamburgerMenu color="#0c0c0c" fontSize={27} onClick={() => setToggleMenu(true)} />

        {toggleMenu && (
          <div className="fixed top-0 left-0 w-full h-screen bg-crimson transition duration-500 ease-out flex-col z-20 flex__center slide-bottom">
            <MdOutlineRestaurantMenu fontSize={27} className="text-27 text-black cursor-pointer absolute top-5 right-5" onClick={() => setToggleMenu(false)} />
            <ul className="list-none">
              {
                data.navItems.map((item, index) => (
                  <li className="m-8 cursor-pointer text-black text-4xl align-center font-base hover:text-grey" key={index} onClick={() => setToggleMenu(false)}>
                    <NavLink to={item.href}>{item.title}</NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;
