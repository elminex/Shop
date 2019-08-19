import React from 'react';

const Product = ({ match }) => (
  <div>
    Product id:
    {match.params.id}
  </div>
);

export default Product;
