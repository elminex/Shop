import { connect } from 'react-redux';
import { cartSelector, changeDiscountAndQuantity } from '../../../redux/reducer';
import Cart from './Cart';

const mapStateToProps = (state) => ({
  cart: cartSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeDiscountAndQuantity: (newDiscount, newQuantity, id) => dispatch(changeDiscountAndQuantity(newDiscount, newQuantity, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
