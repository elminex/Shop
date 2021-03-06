import React from 'react';
import PropTypes from 'prop-types';
import { cartItemTypes } from '../../PropTypes/PropTypes';
import './Checkout.scss';

class CartConfirm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      phone: '',
      comment: '',
      country: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    const { cart } = this.props;
    const {
      firstName,
      lastName,
      companyName,
      email,
      address,
      city,
      country,
      zipCode,
      phone,
      comment,
    } = this.state;

    return (
      <div className="checkout__container">
        <h2 className="checkout__title">Checkout</h2>
        <form className="checkout__form" onSubmit={this.submitHandler}>
          <div className="checkout__inputs">
            <div className="checkout__row">
              <input type="text" className="checkout__form-field" name="firstName" value={firstName} placeholder="First name" onChange={this.changeHandler} required />
              <input type="text" className="checkout__form-field" name="lastName" value={lastName} placeholder="Last name" onChange={this.changeHandler} required />
            </div>
            <input type="text" className="checkout__form-field" name="companyName" value={companyName} placeholder="Company name" onChange={this.changeHandler} />
            <input type="email" className="checkout__form-field" name="email" value={email} placeholder="E-mail" onChange={this.changeHandler} required />
            <input type="text" className="checkout__form-field" name="address" value={address} placeholder="Shipping Address" onChange={this.changeHandler} required />
            <div className="checkout__row">
              <input type="text" className="checkout__form-field" name="city" value={city} placeholder="City" onChange={this.changeHandler} required />
              <input type="tel" className="checkout__form-field" pattern="[0-9]{2}-[0-9]{3}" name="zipCode" value={zipCode} placeholder="Zip code" onChange={this.changeHandler} required />
            </div>
            <input type="text" className="checkout__form-field" name="country" value={country} placeholder="Country" onChange={this.changeHandler} required />
            <input type="tel" className="checkout__form-field" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="phone" value={phone} placeholder="Phone 123-456-7890" required onChange={this.changeHandler} />
            <textarea type="text" className="checkout__form-textarea" name="comment" value={comment} placeholder="Leave a comment about your order" rows="7" cols="30" onChange={this.changeHandler} />
          </div>
          <div className="checkout__cart-items">
            <h3>Your cart summary</h3>
            {cart.length === 0 ? <div>Cart is empty</div>
              : (
                <>
                  <ul className="checkout__cart-list">
                    {cart.map((cartItem) => (
                      <li key={cartItem.product.id}>
                        <span className="checkout__cart-name">{cartItem.product.name}</span>
                        <span className="checkout__cart-quantity">
                          {'Qty: '}
                          {cartItem.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button type="submit" className="checkout__form-button">Submit and pay</button>
                </>
              )}
          </div>
        </form>
      </div>
    );
  }
}

export default CartConfirm;

CartConfirm.propTypes = {
  cart: PropTypes.arrayOf(cartItemTypes).isRequired,
};
