import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ShoppingCartIcon } from '../components';
import { Footer, Navbar } from '../container';

const Layout = (props) => {
  const { loggedIn, setLoggedIn } = props;

  Layout.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
  };

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
