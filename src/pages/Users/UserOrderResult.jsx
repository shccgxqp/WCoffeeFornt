import { useLocation } from 'react-router-dom';
const OrderResult = () => {
  const location = useLocation();
  console.log('location:', location);
  const urlParams = new URLSearchParams(location.search);
  console.log('searchParams:', urlParams);
  const status = urlParams.get('Status');
  const merchantID = urlParams.get('MerchantID');
  const version = urlParams.get('Version');
  const tradeInfo = urlParams.get('TradeInfo');
  const tradeSha = urlParams.get('TradeSha');
  console.log('Status:', status);
  console.log('MerchantID:', merchantID);
  console.log('Version:', version);
  console.log('TradeInfo:', tradeInfo);
  console.log('TradeSha:', tradeSha);

  return (
    <>
      <h1>OrderResult</h1>
      <h2>交易結果:{status}</h2>
      <h2>交易編號:{merchantID}</h2>
      <h2>交易資訊:{tradeInfo}</h2>
    </>
  );
};

export default OrderResult;
