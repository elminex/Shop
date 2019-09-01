import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { productTypes } from '../../PropTypes/PropTypes';
import './AddToCart.scss';

const AddToCart = ({ product, addToCart, location }) => {
  addToCart(product, location.quantity);
  return (
    <div className="add-to-cart__container">
      <h2 className="add-to-cart__text">Product added to cart.</h2>
      <Link className="add-to-cart__button" to="/cart">Go to cart</Link>
      <Link className="add-to-cart__button" to="/shop">Continue shopping</Link>
    </div>
  );
};

export default AddToCart;

AddToCart.propTypes = {
  product: productTypes.isRequired,

  addToCart: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    hash: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
};
