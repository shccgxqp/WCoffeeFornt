import { Routes, Route, Navigate } from 'react-router-dom';
import {
  About,
  Home,
  NoMatch,
  Payment,
  Store,
  StorePurchase,
  Cart,
  User,
  UserLogin,
  UserRegister,
  UserDetails,
  UserDetailsEdit,
  UserAuthLogin,
  UserShipment,
  UserOrder,
  UserOrderDetails,
  UserOrderResult,
  Admin,
  AdminUser,
  AdminProduct,
  AdminProductCreate,
  AdminOrder,
  AdminOrderEdit,
  AdminSendEmail,
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
                <Route path='order' element={<UserOrder />} />
                <Route path='order/details/:id' element={<UserOrderDetails />} />
                <Route path='order/result' element={<UserOrderResult />} />
                <Route path='shipment' element={<UserShipment />} />
              </Route>
              <Route path='/admin' element={<Admin />}>
                <Route index element={<AdminUser />} />
                <Route path='sendEmail/:id' element={<AdminSendEmail />} />
                <Route path='product' element={<AdminProduct />} />
                <Route path='product/create' element={<AdminProductCreate />} />
                <Route path='order' element={<AdminOrder />} />
                <Route path='order/edit/:id' element={<AdminOrderEdit />} />
              </Route>
              <Route path='/login' element={<UserLogin />} />
              <Route path='/register' element={<UserRegister />} />
              <Route path='/auth/login' element={<UserAuthLogin />} />
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
