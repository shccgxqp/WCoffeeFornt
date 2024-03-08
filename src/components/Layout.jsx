import { Outlet } from 'react-router-dom';
import { ShoppingCartIcon } from '../components';
import { Footer, Navbar } from '../container';
import { useAuth } from '../container/useAuth';

const Layout = () => {
  const { loggedIn, setLoggedIn } = useAuth();

  return (
    <div>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <ShoppingCartIcon />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
