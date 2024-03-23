import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCookie, getCookie } from '../../helpers/cookieHelpers';
import { Popup } from '../../components';
import { MdShoppingCart } from 'react-icons/md';
import { useAuth } from '../../contexts/useProvider';

const Cart = () => {
  const { loggedIn } = useAuth();
  const [cart, setCart] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [shipment, setShipment] = useState(null);
  const [checkShipment, setCheckShipment] = useState(null);
  const [comments, setComments] = useState('');
  const navigate = useNavigate();

  const postOrder = async () => {
    let productItems = getCookie('cart') || '[]';
    productItems = JSON.parse(productItems);
    productItems = productItems.map((item) => {
      return { id: parseInt(item.id), qty: parseInt(item.quantity) };
    });
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/api/user/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          shipment_id: checkShipment,
          comments: comments,
          product: productItems,
        }),
        credentials: 'include',
        mode: 'cors',
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed.');

      setCart([]);
      setCookie('cart', JSON.stringify([]), 1);
      setShowPopup(false);

      navigate(`/payment/${data.data.order.id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!loggedIn) {
        setShowPopup(false);
        navigate('/login', { state: { message: '請先登錄才能訪問購物車' } });
        return;
      }
      const existingCart = JSON.parse(getCookie('cart') || '[]');
      try {
        const shipmentResponse = await fetch(`${process.env.REACT_APP_API}/api/user/shipment`, {
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          mode: 'cors',
        });
        const shipmentData = await shipmentResponse.json();
        setShipment(shipmentData.data);
        setCheckShipment(shipmentData.data[0].id || null);
        setCart(existingCart);
      } catch (error) {
        console.error('Error fetching shipment data:', error);
      }
    };

    fetchData();
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    setCookie('cart', JSON.stringify(updatedCart), 1);
  };

  const totalAmount = cart.reduce((total, item) => {
    return total + parseFloat(item.price) * parseInt(item.quantity);
  }, 0);

  return (
    <div className='mx-auto mt-8 min-h-screen w-[600px]'>
      <h1 className='mb-4 text-2xl font-semibold'>購物車</h1>
      {cart.length === 0 ? (
        <p>您的購物車是空的</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} className='flex items-center justify-between border-b py-4'>
              <div>
                <p className='font-semibold'>{item.name}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                className='text-red-500 hover:text-red-700 focus:outline-none'
                onClick={() => removeFromCart(index)}>
                Remove
              </button>
            </div>
          ))}
          <div className='mt-4'>
            <p className='font-semibold'>Total Amount: ${totalAmount.toFixed(2)}</p>
          </div>
          <select name='shipment' id='shipment' onClick={(ev) => setCheckShipment(parseInt(ev.target.value))}>
            {shipment &&
              shipment.map((item) => (
                <option key={item.id} value={item.id}>
                  貨運方式 :{item.state} 地址 : {item.address}
                </option>
              ))}
          </select>

          <div className='mt-4 flex flex-col items-center justify-center'>
            <input
              type='text'
              placeholder='輸入您的留言'
              onChange={(ev) => setComments(ev.target.value)}
              className='w-full border border-slate-200 p-4'
            />
            <button
              className='m-4 mx-auto rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none'
              onClick={() => {
                setShowPopup(true);
              }}>
              確認訂單
            </button>
          </div>
        </div>
      )}
      {showPopup && (
        <Popup show={showPopup} onClose={() => setShowPopup(false)} successFunction={postOrder}>
          <div className='flex-auto justify-center p-5 text-center'>
            <MdShoppingCart
              xmlns='http://www.w3.org/2000/svg'
              className='mx-auto flex h-16 w-16 items-center text-green-400'
              viewBox='0 0 20 20'
              fill='currentColor'></MdShoppingCart>
            <h2 className='py-4 text-xl font-bold '>確認下單?</h2>
            <p className='text-gray-500 px-8 text-sm'>請確認您的訂單，商品發貨時，將會寄信給您。</p>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Cart;
