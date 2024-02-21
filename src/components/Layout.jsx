import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar } from '../components';
import { Footer } from '../container';

const Layout = (props) => {
  const { loggedIn, setLoggedIn } = props;

  Layout.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    setLoggedIn: PropTypes.func.isRequired,
  };

  return (
    <div>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
