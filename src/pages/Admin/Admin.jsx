import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { adminItems } from '../../constants/data';
const Admin = () => {
  return (
    <>
      <div className='flex flex-row justify-center rounded-b-lg border-t-2 border-golden bg-crimson'>
        {adminItems.map((category) => (
          <NavLink
            className='text-md m-2 flex flex-wrap items-center justify-center gap-5 rounded-lg pb-2.5  pt-3 text-black hover:bg-golden'
            key={category.id}
            to={`/admin/${category.href}`}>
            {category.icon}
            <span className=''>{category.name}</span>
          </NavLink>
        ))}
      </div>
      <Outlet />
    </>
  );
};

export default Admin;
