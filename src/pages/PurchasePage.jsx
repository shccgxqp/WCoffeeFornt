import { useParams } from 'react-router-dom';

const PurchasePage = () => {
  const { id } = useParams();
  console.log(useParams());
  return (
    <div>
      <h1>Purchase Page +{id}</h1>
    </div>
  );
};
export default PurchasePage;
