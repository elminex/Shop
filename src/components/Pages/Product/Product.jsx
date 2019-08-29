import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { productTypes, requestTypes } from '../../../PropTypes/PropTypes';
import Loader from '../../Loader/Loader';
import './Product.scss';

const Product = ({ product, request, loadProducts }) => {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (!product) {
      loadProducts();
    }
  }, [product]);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  let content;
  switch (true) {
    case request.success:
      content = (
        <div className="product__container">
          <div className="product__image-container">
            <img className="product__image" src={product.photo} alt={product.name} />
          </div>
          <div className="product__info">
            <div className="product__line" />
            <h2 className="product__name">{product.name}</h2>
            <span className="product__price">
              $
              {product.price}
            </span>
            <p className="product__in-stock">
              In stock:
              <span className="product__in-stock-number" style={product.stock > 0 ? { color: '#1FD34A' } : { color: '#dc3545' }}>{product.stock}</span>
            </p>
            <span className="product__producer">
              Producer:
              <br />
              {product.company}
            </span>
            <p className="product__description">{product.description}</p>
            <label htmlFor="quantity">
              Quantity:
              <input id="quantity" type="number" value={quantity} min="1" max={product.stock} onChange={(e) => handleChange(e)} />
            </label>
            <Link
              className="product__button"
              to={{
                pathname: `/cart/add/${product.id}`,
                quantity,
              }}
            >
              Add to Cart
            </Link>
          </div>
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

Product.propTypes = {
  product: productTypes.isRequired,
  request: requestTypes.isRequired,
  loadProducts: PropTypes.func.isRequired,
};
