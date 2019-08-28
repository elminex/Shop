import React from 'react';
import PropTypes from 'prop-types';

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
  cart: PropTypes.shape({
    product: PropTypes.shape({
      company: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
    quantity: PropTypes.number.isRequired,
    discount: PropTypes.string.isRequired,
    itemsPrice: PropTypes.number.isRequired,
  }).isRequired,
};
