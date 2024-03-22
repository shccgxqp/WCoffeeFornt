import { Routes, Route, Navigate } from 'react-router-dom';
import {
  About,
  Home,
  NoMatch,
  User,
  Login,
  Register,
  Store,
  StorePurchase,
  Cart,
  UserDetails,
  UserDetailsEdit,
  AuthLogin,
  Shipment,
  Payment,
  Order,
  OrderDetails,
  OrderResult,
} from './pages';
import { Layout } from './pages';
import AuthProvider from './contexts/AuthProvider';
import ContextProvider from './contexts/ContextProvider';

const App = () => {
  return (
    <div>
      <AuthProvider>
        <ContextProvider>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/store' element={<Store />} />
              <Route path='/store/Purchase/:id' element={<StorePurchase />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/payment/:orderId' element={<Payment />} />
              <Route path='/user' element={<User />}>
                <Route index element={<UserDetails />} />
                <Route path='edit' element={<UserDetailsEdit />} />
                <Route path='order' element={<Order />} />
                <Route path='order/details/:id' element={<OrderDetails />} />
                <Route path='order/result' element={<OrderResult />} />
                <Route path='shipment' element={<Shipment />} />
              </Route>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/auth/login' element={<AuthLogin />} />
              <Route path='/api/*' element={<Navigate to='/' />} />
              <Route path='*' element={<NoMatch />} />
            </Route>
          </Routes>
        </ContextProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
