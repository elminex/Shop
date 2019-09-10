import { connect } from 'react-redux';
import {
  cartSelector,
  dataSelector,
  changeQuantityAndPrice,
  removeFromCart,
  selectShippingOption,
  countTotalPrice,
  setDiscount,
} from '../../redux/reducer';
import Cart from './Cart';

const mapStateToProps = (state) => ({
  cart: cartSelector(state),
  data: dataSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeQuantity: (
    newQuantity,
    id,
  ) => dispatch(changeQuantityAndPrice(
    newQuantity,
    id,
  )),
  removeItem: (itemId) => dispatch(removeFromCart(itemId)),
  selectShipping: (type) => dispatch(selectShippingOption(type)),
  setDiscount: (number) => dispatch(setDiscount(number)),
  countTotal: () => dispatch(countTotalPrice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
