import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { productTypes } from '../../PropTypes/PropTypes';

const AddToCart = ({ product, addToCart, location }) => {
  addToCart(product, location.quantity);
  return (
    <div>
      Product added to cart.
      <Link to="/cart">Go to cart</Link>
      <Link to="/">Continue shopping</Link>
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
