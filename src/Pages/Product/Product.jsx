import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { productTypes, requestTypes } from '../../PropTypes/PropTypes';
import Loader from '../../components/Loader/Loader';
import './Product.scss';

const Product = ({ product, request, loadProducts }) => {
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    if (!product) {
      loadProducts();
    }
  }, [product]);

  const handleChange = (e) => {
    setQuantity(parseInt(e.target.value, 10));
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
            {product.stock === true ? <span className="product__in-stock" style={{ color: '#1FD34A' }}>In stock</span> : <span className="product__in-stock" style={{ color: '#dc3545' }}>Out of stock</span>}
            <span className="product__producer">
              Producer:
              <br />
              {product.company}
            </span>
            <p className="product__description">{product.description}</p>
            <label htmlFor="quantity">
              Quantity:
              <input id="quantity" type="number" value={quantity} min="0" max={20} onChange={(e) => handleChange(e)} />
            </label>
            {
              product.stock === true ? (
                <Link
                  className="product__button"
                  to={{
                    pathname: `/cart/add/${product.id}`,
                    quantity,
                  }}
                >
                  Add to Cart
                </Link>
              ) : <button type="button" className="product__button-disabled" disabled>Add to Cart</button>
            }
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
  product: PropTypes.oneOfType([
    productTypes,
    () => undefined]),
  request: requestTypes.isRequired,
  loadProducts: PropTypes.func.isRequired,
};
