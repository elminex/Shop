import React from 'react';

const ProductGaleryItem = ({ elem }) => (
  <div style={{ backgroundImage: `url(${elem.photo})` }}>
    <span>{elem.name}</span>
    <span>{elem.price}</span>
  </div>
);

export default ProductGaleryItem;
