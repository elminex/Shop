import React from 'react';
import { Link } from 'react-router-dom';
import { productTypes } from '../../PropTypes/PropTypes';
import './ProductPreview.scss';

const ProductPreview = ({ elem }) => {
  function cutText(text, chars = 150) {
    if (chars < 1) {
      return 'error';
    }
    if (text.length > chars) {
      const cutContent = `${text.substr(0, text.lastIndexOf(' ', chars))} ...`;
      return cutContent;
    }
    return text;
  }

  return (
    <Link className="product-preview" to={`/product/${elem.id}`}>
      <h3 className="product-preview__title">{elem.name}</h3>
      <div className="product-preview__mid">
        <div className="product-preview__image-wrapper">
          <img className="product-preview__image" src={elem.photo} alt={`${elem.name}`} />
        </div>
        <div className="product-preview__mid-right">
          {elem.stock > 0 ? <span className="product-preview__out-of-stock">Out of stock!</span> : ''}
          <span className="product-preview__company">
            Producent:
            <br />
            {elem.company}
          </span>
          <span className="product-preview__price">
            $
            {elem.price}
          </span>
        </div>
      </div>
      <p className="product-preview__description">{cutText(elem.description)}</p>
    </Link>
  );
};

export default ProductPreview;

ProductPreview.propTypes = {
  elem: productTypes.isRequired,
};
