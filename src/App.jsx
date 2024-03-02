import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import {
  About,
  Home,
  Menu,
  NoMatch,
  Login,
  Register,
  Store,
  PurchasePage,
} from './pages';
import { Layout } from './components';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
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
