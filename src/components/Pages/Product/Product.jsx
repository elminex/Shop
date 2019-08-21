import React from 'react';
import Loader from '../../Loader/Loader';

const Product = ({ product }) => {
  console.log(product);
  return (
    <div>
      <Loader />
      Product id:
      {product.name}
    </div>
  );
};

export default Product;
