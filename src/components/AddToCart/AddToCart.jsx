import React from 'react';
import { Link } from 'react-router-dom';

const AddToCart = ({ product, addToCart }) => {
  console.log(product);
  addToCart(product);
  return (
    <div>
      Product added to cart.
      <Link to="/cart">Go to cart</Link>
      <Link to="/">Continue shopping</Link>
    </div>
  );
};

export default AddToCart;
