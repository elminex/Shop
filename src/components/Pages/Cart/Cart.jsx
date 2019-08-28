import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import CartItem from '../../CartItem/CartItem';

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
    console.log('submit');
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
    const total = cart.map((item) => parseFloat(item.itemsPrice))
      .reduce((a, b) => a + b, 0) + shippingCost;
    if (confirm) {
      return <Redirect to="/cart/confirm" />;
    }
    if (cart.length === 0) {
      return (<div>The cart is empty. </div>);
    }
    return (
      <div>
        <ul>
          {cart.map((cartItem) => (
            <CartItem
              key={cartItem.product.id}
              item={cartItem}
              changeDiscountAndQuantity={changeDiscountAndQuantity}
              removeItem={removeItem}
            />
          ))}
        </ul>
        <span>
          Total price:
          {Math.round(total * 100) / 100}
        </span>
        <form onSubmit={(e) => this.formHandle(e)}>
          <label htmlFor="economy">
            Economy
            <input id="economy" name="shipping" type="radio" value="economy" onChange={this.selectOptionHandle} />
          </label>
          <label htmlFor="premium">
            Premium
            <input id="premium" name="shipping" type="radio" value="premium" onChange={this.selectOptionHandle} />
          </label>
          <label htmlFor="superPremium">
            Super Premium
            <input id="superPremium" name="shipping" type="radio" value="superPremium" onChange={this.selectOptionHandle} />
          </label>
          <button type="submit">Everything is great, lets pay!</button>
        </form>
      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
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
  })).isRequired,
  changeDiscountAndQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  selectShipping: PropTypes.func.isRequired,
};
