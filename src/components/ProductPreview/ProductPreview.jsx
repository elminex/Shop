import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
    <div className="product-preview">
      <Link className="product-preview__link" to={`/product/${elem.id}`}>{elem.name}</Link>
      <div className="product-preview__mid">
        <div className="product-preview__image-wrapper">
          <img className="product-preview__image" src={elem.photo} alt={`${elem.name}`} />
        </div>
        <div className="product-preview__mid-right">
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
    </div>
  );
};

export default ProductPreview;

ProductPreview.propTypes = {
  elem: PropTypes.shape({
    company: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};
