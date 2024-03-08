import { createContext, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { getCookie } from '../helpers/cookieHelpers';

// Create a context for the login state
export const AuthContext = createContext();

// Provider component to wrap your app
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
