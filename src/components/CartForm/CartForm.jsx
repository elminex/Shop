import React from 'react';
import PropTypes from 'prop-types';

const CartForm = ({
  formHandle, selectOptionHandle, data, selectedOption, handleDiscount,
}) => {
  const priceFormat = (price) => (price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
  return (
    <form className="cart__total" onSubmit={(e) => formHandle(e)}>
      <h3 className="cart__total-title">Cart total</h3>
      <ul>
        <li className="cart__total-price">
          <span>Sub-total:</span>
          <span className="cart__total-price--lg">
            $
            {priceFormat(data.subTotal)}
          </span>
        </li>
        <li>
          <h4 className="cart__total-shipping-title">Select shipping:</h4>
          <label htmlFor="economy">
            Economy
            <input id="economy" name="shipping" type="radio" value="economy" checked={selectedOption === 'economy'} onChange={selectOptionHandle} />
          </label>
          <label htmlFor="premium">
            Premium
            <input id="premium" name="shipping" type="radio" value="premium" checked={selectedOption === 'premium'} onChange={selectOptionHandle} />
          </label>
          <label htmlFor="superPremium">
            Super Premium
            <input id="superPremium" name="shipping" type="radio" value="superPremium" checked={selectedOption === 'superPremium'} onChange={selectOptionHandle} />
          </label>
        </li>
        <li>
          <label htmlFor="discount">
            {'Discount code:'}
            <input type="text" id="discount" onChange={(e) => handleDiscount(e)} placeholder="Enter code" />
          </label>
        </li>
        <li className="cart__total-price">
          <span>
            Total:
          </span>
          <span className="cart__total-price--lg">
            $
            {priceFormat(data.total)}
          </span>
        </li>
      </ul>
      <button className="cart__total-button" type="submit">Checkout</button>
    </form>
  );
};
export default CartForm;

CartForm.propTypes = {
  handleDiscount: PropTypes.func.isRequired,
  formHandle: PropTypes.func.isRequired,
  selectOptionHandle: PropTypes.func.isRequired,
  data: PropTypes.shape({
    shipping: PropTypes.number.isRequired,
    subTotal: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  selectedOption: PropTypes.string.isRequired,
};
