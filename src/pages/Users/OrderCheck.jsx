import { useParams } from 'react-router-dom';
const OrderCheck = () => {
  const { Status } = useParams();
  return (
    <>
      <h1>OrderCheck</h1>
      <h2>交易結果:{Status}</h2>
    </>
  );
};

export default OrderCheck;
