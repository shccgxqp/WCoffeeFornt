import { Outlet } from 'react-router-dom';
import { SocialMediaIcons } from '../components';
import { Footer, Navbar } from '../container';
import { useAuth } from '../contexts/useProvider';

const Layout = () => {
  const { loggedIn, setLoggedIn, isAdmin, setIsAdmin } = useAuth();

  return (
    <div>
      <Navbar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />
      <SocialMediaIcons />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Layout;
