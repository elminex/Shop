import React from 'react';
import PropTypes from 'prop-types';
import { cartItemTypes } from '../../PropTypes/PropTypes';

const CartItem = ({ item, changeDiscountAndQuantity, removeItem, number }) => (
  <tr>
    <td>{number}</td>
    <td><img src={item.product.photo} alt={item.product.name} /></td>
    <td>{item.product.name}</td>
    <td>${item.product.price}</td>
    <td>
      <label htmlFor="quantity">
        Product quantity:
        <input
          min="1"
          max={item.product.stock}
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
    </td>
    <td>
      <button type="button" onClick={() => removeItem(item.product.id)}>Remove from cart</button>
    </td>
  </tr>
);

export default CartItem;

CartItem.propTypes = {
  item: cartItemTypes.isRequired,
  changeDiscountAndQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
};
