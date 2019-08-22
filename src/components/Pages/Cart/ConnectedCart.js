import { connect } from 'react-redux';
import { cartSelector, changeDiscount, changeQuantity } from '../../../redux/reducer';
import Cart from './Cart';

const mapStateToProps = (state) => ({
  cart: cartSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeDiscount: (newDiscount, id) => dispatch(changeDiscount(newDiscount, id)),
  changeQuantity: (newQuantity, id) => dispatch(changeQuantity(newQuantity, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
