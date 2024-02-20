import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  About,
  Awards,
  Contact,
  Home,
  Menu,
  NoMatch,
  Login,
  Register,
} from './pages';
import { Layout } from './components';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // const [email, setEmail] = useState('')
  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }
    setLoggedIn(true);
  }, []);
  //   fetch('http://localhost:3080/verify', {
  //     method: 'POST',
  //     headers: {
  //       'jwt-token': user.token,
  //     },
  //   })
  //     .then((r) => r.json())
  //     .then((r) => {
  //       setLoggedIn('success' === r.message)
  //     })
  // }, [])

  return (
    <div>
      {/* <button onClick={() => setLoggedIn(!loggedIn)}>login</button> */}
      <Routes>
        <Route
          path='/'
          element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        >
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/awards' element={<Awards />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
