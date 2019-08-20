import React from 'react';
import Loader from '../Loader/Loader';

const Product = ({ match }) => (
  <div>
    <Loader />
    Product id:
    {match.params.id}
  </div>
);

export default Product;
