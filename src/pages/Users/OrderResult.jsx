import { useLocation } from 'react-router-dom';
const OrderResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('Status');
  const merchantId = searchParams.get('MerchantID');
  const tradeInfo = searchParams.get('TradeInfo');
  console.log('Status:', status);
  console.log('MerchantID:', merchantId);
  console.log('TradeInfo:', tradeInfo);

  return (
    <>
      <h1>OrderResult</h1>
      <h2>交易結果:{status}</h2>
      <h2>交易編號:{merchantId}</h2>
      <h2>交易資訊:{tradeInfo}</h2>
    </>
  );
};

export default OrderResult;
