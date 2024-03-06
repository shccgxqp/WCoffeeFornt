import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  About,
  Home,
  Menu,
  NoMatch,
  User,
  Login,
  Register,
  Store,
  PurchasePage,
  Cart,
} from './pages';
import { Layout } from './components';
import { getCookie } from './helpers/cookieHelpers';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []); // 仅在组件加载时运行一次

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/store/:id' element={<PurchasePage />} />
          <Route path='/store' element={<Store />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/user' element={<User />} />
          <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/api/*' element={<Navigate to='/' />} />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
