import React from 'react';
import PropTypes from 'prop-types';
import { cartItemTypes } from '../../PropTypes/PropTypes';

const CartItem = ({ item, changeDiscountAndQuantity, removeItem }) => (
  <li key={item.product.id}>
    {item.product.name}
    <label htmlFor="quantity">
      Product quantity:
      <input
        min="1"
        id="quantity"
        type="number"
        value={item.quantity}
        onChange={(e) => changeDiscountAndQuantity(
          item.discount,
          e.target.value,
          item.product.id,
        )}
      />
    </label>
    <label htmlFor="discount">
      Select Discount in %:
      <input
        id="discount"
        type="number"
        value={item.discount}
        onChange={(e) => changeDiscountAndQuantity(
          e.target.value,
          item.quantity,
          item.product.id,
        )}
      />
    </label>
    <button type="button" onClick={() => removeItem(item.product.id)}>Remove from cart</button>
  </li>
);

export default CartItem;

CartItem.propTypes = {
  item: cartItemTypes.isRequired,
  changeDiscountAndQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};
