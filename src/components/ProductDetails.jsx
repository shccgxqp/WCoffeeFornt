import { PropTypes } from 'prop-types';
const ProductDetails = ({ product }) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div>
        <p>
          <span className='font-semibold'>Name:</span> {product.name}
        </p>
        <p>
          <span className='font-semibold'>Category:</span> {product.Category}
        </p>
        <p>
          <span className='font-semibold'>Origin:</span> {product.Origin}
        </p>
        <p>
          <span className='font-semibold'>Price:</span> ${product.price}
        </p>
        <p>
          <span className='font-semibold'>Weight:</span> {product.weight}
        </p>
        <p>
          <span className='font-semibold'>Description:</span> {product.description || 'N/A'}
        </p>
      </div>
      <div>
        <img
          className='h-60 w-60 object-cover'
          src={`${process.env.REACT_APP_API}/images/${product.image}.jpg`}
          alt={product.name}
        />
      </div>
    </div>
  );
};

ProductDetails.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductDetails;
