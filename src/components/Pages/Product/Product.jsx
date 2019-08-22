import React from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../Loader/Loader';

const Product = ({ product, request }) => {
  let content;
  switch (true) {
    case request.success:
      content = (
        <div>
          <span>{product.name}</span>
          <div>
            <img src={product.photo} alt={product.name} />
          </div>
          <span>
            $
            {product.price}
          </span>
          <Link to={`/cart/add/${product.id}`}>Add to Cart</Link>
          <span>
            Producent:
            <br />
            {product.company}
          </span>
          <p>{product.description}</p>
        </div>
      );
      break;
    case request.error:
      content = <div>An error occured, please try again</div>;
      break;
    default:
      content = <Loader />;
  }
  return content;
};

export default Product;
