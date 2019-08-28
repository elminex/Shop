import { connect } from 'react-redux';
import {
  cartSelector,
  changeDiscountAndQuantity,
  removeFromCart,
  selectShippingOption,
} from '../../../redux/reducer';
import Cart from './Cart';

const mapStateToProps = (state) => ({
  cart: cartSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeDiscountAndQuantity: (
    newDiscount,
    newQuantity,
    id,
  ) => dispatch(changeDiscountAndQuantity(
    newDiscount,
    newQuantity,
    id,
  )),
  removeItem: (itemId) => dispatch(removeFromCart(itemId)),
  selectShipping: (type) => dispatch(selectShippingOption(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
