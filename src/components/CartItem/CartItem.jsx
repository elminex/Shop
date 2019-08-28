import React from 'react';
import PropTypes from 'prop-types';

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
  item: PropTypes.shape({
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
  changeDiscountAndQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};
