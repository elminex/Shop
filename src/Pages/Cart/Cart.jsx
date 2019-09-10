import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import CartTable from '../../components/CartTable/CartTable';
import { cartItemTypes } from '../../PropTypes/PropTypes';
import './Cart.scss';
import CartForm from '../../components/CartForm/CartForm';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'premium',
      checkout: false,
      discount: '',
    };
    this.selectOptionHandle = this.selectOptionHandle.bind(this);
    this.formHandle = this.formHandle.bind(this);
    this.discountHandle = this.discountHandle.bind(this);
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

  discountHandle(e) {
    const { setDiscount, countTotal } = this.props;
    const discountText = e.target.value.toLowerCase();
    switch (discountText) {
      case 'small':
        this.setState({ discount: e.target.value });
        setDiscount(10);
        break;
      case 'medium':
        this.setState({ discount: e.target.value });
        setDiscount(20);
        break;
      case 'high':
        this.setState({ discount: e.target.value });
        setDiscount(30);
        break;
      default:
        this.setState({ discount: e.target.value });
        setDiscount(0);
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
    const { selectedOption, checkout, discount } = this.state;
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
    return (
      <div className="cart">
        <h2 className="cart__title">Shopping cart</h2>
        <div className="cart__container">
          <CartTable cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />
          <CartForm
            formHandle={this.formHandle}
            selectOptionHandle={this.selectOptionHandle}
            data={data}
            selectedOption={selectedOption}
            handleDiscount={this.discountHandle}
            discount={discount}
          />
        </div>
      </div>
    );
  }
}

export default Cart;

Cart.propTypes = {
  setDiscount: PropTypes.func.isRequired,
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
