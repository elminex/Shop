import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem';
import { cartItemTypes } from '../../PropTypes/PropTypes';
import './Cart.scss';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'premium',
      checkout: false,
    };
    this.selectOptionHandle = this.selectOptionHandle.bind(this);
  }

  componentDidMount() {
    const { selectShipping, countTotal } = this.props;
    selectShipping(20);
    countTotal();
  }

  formHandle(e) {
    e.preventDefault();
    this.setState({ checkout: true });
  }

  selectOptionHandle(e) {
    const { selectShipping, countTotal } = this.props;
    switch (e.target.value) {
      case 'economy':
        this.setState({ selectedOption: e.target.value });
        selectShipping(10);
        break;
      case 'premium':
        this.setState({ selectedOption: e.target.value });
        selectShipping(20);
        break;
      default:
        this.setState({ selectedOption: e.target.value });
        selectShipping(30);
        break;
    }
    countTotal();
  }

  render() {
    const {
      cart,
      changeQuantity,
      removeItem,
      data,
    } = this.props;
    const { selectedOption, checkout } = this.state;
    if (checkout) {
      return <Redirect to="/cart/checkout" />;
    }
    if (cart.length === 0) {
      return (
        <div className="cart cart--empty">
          <h2 className="cart__title">The cart is empty.</h2>
          <Link to="/shop" className="cart__total-button">Find products</Link>
        </div>
      );
    }
    const priceFormat = (price) => (price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));

    return (
      <div className="cart">
        <h2 className="cart__title">Shopping cart</h2>
        <div className="cart__container">
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
          <form className="cart__total" onSubmit={(e) => this.formHandle(e)}>
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
                  <input id="economy" name="shipping" type="radio" value="economy" checked={selectedOption === 'economy'} onChange={this.selectOptionHandle} />
                </label>
                <label htmlFor="premium">
                  Premium
                  <input id="premium" name="shipping" type="radio" value="premium" checked={selectedOption === 'premium'} onChange={this.selectOptionHandle} />
                </label>
                <label htmlFor="superPremium">
                  Super Premium
                  <input id="superPremium" name="shipping" type="radio" value="superPremium" checked={selectedOption === 'superPremium'} onChange={this.selectOptionHandle} />
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
        </div>
      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  cart: PropTypes.arrayOf(cartItemTypes).isRequired,
  changeQuantity: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  selectShipping: PropTypes.func.isRequired,
  countTotal: PropTypes.func.isRequired,
  data: PropTypes.shape({
    shipping: PropTypes.number.isRequired,
    subTotal: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
};
