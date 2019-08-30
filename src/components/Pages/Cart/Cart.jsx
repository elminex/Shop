import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import CartItem from '../../CartItem/CartItem';
import { cartItemTypes } from '../../../PropTypes/PropTypes';
import './Cart.scss';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'premium',
      confirm: false,
    };
    this.selectOptionHandle = this.selectOptionHandle.bind(this);
  }

  formHandle(e) {
    const { selectShipping } = this.props;
    const { selectedOption } = this.state;
    e.preventDefault();
    selectShipping(selectedOption);
    this.setState({ confirm: true });
  }

  selectOptionHandle(e) {
    this.setState({ selectedOption: e.target.value });
  }

  render() {
    const { cart, changeDiscountAndQuantity, removeItem } = this.props;
    const { selectedOption, confirm } = this.state;
    let shippingCost;
    switch (selectedOption) {
      case 'premium':
        shippingCost = 20;
        break;
      case 'superPremium':
        shippingCost = 30;
        break;
      default:
        shippingCost = 10;
        break;
    }
    const subTotal = cart.map((item) => parseFloat(item.itemsPrice))
      .reduce((a, b) => a + b, 0);
    if (confirm) {
      return <Redirect to="/cart/confirm" />;
    }
    if (cart.length === 0) {
      return (<div>The cart is empty. </div>);
    }
    return (
      <div>
        <div className="cart__container">
          <table className="cart__table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((cartItem, index) => (
                <CartItem
                  number={index + 1}
                  key={cartItem.product.id}
                  item={cartItem}
                  changeDiscountAndQuantity={changeDiscountAndQuantity}
                  removeItem={removeItem}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="cart__total">
          <span>
            Sub-total:
          {Math.round(subTotal * 100) / 100}
          </span>

          <form onSubmit={(e) => this.formHandle(e)}>
            <label htmlFor="economy">
              Economy
            <input id="economy" name="shipping" type="radio" value="economy" checked={selectedOption === "economy"} onChange={this.selectOptionHandle} />
            </label>
            <label htmlFor="premium">
              Premium
            <input id="premium" name="shipping" type="radio" value="premium" checked={selectedOption === "premium"} onChange={this.selectOptionHandle} />
            </label>
            <label htmlFor="superPremium">
              Super Premium
            <input id="superPremium" name="shipping" type="radio" value="superPremium" checked={selectedOption === "superPremium"} onChange={this.selectOptionHandle} />
            </label>
            <span>
              Total:
              {Math.round(subTotal * 100) / 100 + shippingCost}
            </span>
            <button type="submit">Everything is great, lets pay!</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  cart: PropTypes.arrayOf(cartItemTypes).isRequired,
  changeDiscountAndQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  selectShipping: PropTypes.func.isRequired,
};
