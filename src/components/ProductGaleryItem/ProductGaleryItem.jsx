import React from 'react';
import { Link } from 'react-router-dom';

const ProductGaleryItem = ({ elem }) => (
  <Link to={`/product/${elem.id}`} className="main-page__product" style={{ backgroundImage: `url(${elem.photo})` }}>
    <div className="main-page__product-overlay">
      <div className="main-page__product-line" />
      <p className="main-page__product-price">${elem.price}</p>
      <h2 className="main-page__product-name">{elem.name}</h2>
    </div>
  </Link>
);

export default ProductGaleryItem;
