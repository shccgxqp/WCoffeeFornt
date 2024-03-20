import { createContext, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';

// Create a context for the login state
export const AuthContext = createContext();
// Provider component to wrap your app
const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/api/user/checkLogin`, {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          mode: 'cors',
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Login failed.');
        setLoggedIn(data.data.isLogin);
        setIsAdmin(data.data.isAdmin || false);
        console.log('loggedIn:', data.data.isLogin, 'isAdmin:', data.data.isAdmin);
      } catch (error) {
        console.log(error);
      }
    };
    checkLogin();
  }, []);

  return <AuthContext.Provider value={{ loggedIn, setLoggedIn, isAdmin, setIsAdmin }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
