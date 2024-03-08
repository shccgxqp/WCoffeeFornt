import { Routes, Route, Navigate } from 'react-router-dom';
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
import { AuthProvider } from './container';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/store/:id' element={<PurchasePage />} />
            <Route path='/store' element={<Store />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/user' element={<User />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/api/*' element={<Navigate to='/' />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
