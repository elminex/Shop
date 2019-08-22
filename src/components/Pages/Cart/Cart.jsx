import React from 'react';
import PropTypes from 'prop-types';

const Cart = ({ cart, changeDiscountAndQuantity }) => {
  const total = cart.map((item) => parseFloat(item.itemsPrice)).reduce((a, b) => a + b, 0);
  console.log(total);
  return (
    <div>
      <ul>
        Cart
        {cart.map((cartItem) => (
          <li key={cartItem.product.id}>
            {cartItem.product.name}
            <label htmlFor="quantity">
              Product quantity:
              <input
                min="1"
                id="quantity"
                type="number"
                value={cartItem.quantity}
                onChange={(e) => changeDiscountAndQuantity(
                  cartItem.discount,
                  e.target.value,
                  cartItem.product.id,
                )}
              />
            </label>
            <label htmlFor="discount">
              Select Discount in %:
              <input
                id="discount"
                type="number"
                value={cartItem.discount}
                onChange={(e) => changeDiscountAndQuantity(
                  e.target.value,
                  cartItem.quantity,
                  cartItem.product.id,
                )}
              />
            </label>
          </li>
        ))}
      </ul>
      <span>
        Total price:
        {Math.round(total * 100) / 100}
      </span>
    </div>
  );
};

export default Cart;

Cart.propTypes = {
  cart: PropTypes.arrayOf({
    product: PropTypes.shape({
      company: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    }),
    quantity: PropTypes.string.isRequired,
    discount: PropTypes.string.isRequired,
    itemsPrice: PropTypes.number.isRequired,
  }).isRequired,
  changeDiscountAndQuantity: PropTypes.func.isRequired,
};
