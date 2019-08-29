import React from 'react';
import PropTypes from 'prop-types';
import { cartItemTypes } from '../../../PropTypes/PropTypes';

const CartConfirm = ({ cart }) => (
  <div>
    <ul>
      {cart.map((cartItem) => (
        <li key={cartItem.product.id}>
          {cartItem.product.name}
          <span>
            Product quantity:
            {cartItem.quantity}
          </span>
          <span>
            Select Discount in %:
            {cartItem.discount}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default CartConfirm;

CartConfirm.propTypes = {
  cart: PropTypes.arrayOf(cartItemTypes).isRequired,
};
