import React from 'react';
import PropTypes from 'prop-types';
import { cartItemTypes } from '../../PropTypes/PropTypes';

const CartItem = ({
  item,
  changeQuantity,
  removeItem,
  number,
}) => (
  <tr>
    <td>{number}</td>
    <td><img className="cart__table-image" src={item.product.photo} alt={item.product.name} /></td>
    <td className="cart__table-name">{item.product.name}</td>
    <td className="cart__table-price">
      $
      {item.product.price}
    </td>
    <td>
      <label htmlFor="quantity">
        Product quantity:
        <input
          min="1"
          max="20"
          id="quantity"
          type="number"
          value={item.quantity}
          onChange={(e) => changeQuantity(
            e.target.value,
            item.product.id,
          )}
        />
      </label>
    </td>
    <td>
      <button className="cart__table-button" type="button" onClick={() => removeItem(item.product.id)}>X</button>
    </td>
  </tr>
);

export default CartItem;

CartItem.propTypes = {
  item: cartItemTypes.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
};
