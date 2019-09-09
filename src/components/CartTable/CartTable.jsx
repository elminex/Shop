import React from 'react';
import PropTypes from 'prop-types';
import CartItem from '../CartItem/CartItem';
import { cartItemTypes } from '../../PropTypes/PropTypes';

const CartTable = ({ cart, changeQuantity, removeItem }) => (
  <div className="cart__table-wrapper">
    <table className="cart__table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {cart.map((cartItem, index) => (
          <CartItem
            number={index + 1}
            key={cartItem.product.id}
            item={cartItem}
            changeQuantity={changeQuantity}
            removeItem={removeItem}
          />
        ))}
      </tbody>
    </table>
  </div>
);
export default CartTable;

CartTable.propTypes = {
  cart: cartItemTypes.isRequired,
  changeQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};
