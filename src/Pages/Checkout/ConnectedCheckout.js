import { connect } from 'react-redux';

import { cartSelector } from '../../redux/reducer';
import CartConfirm from './Checkout';

const mapStateToProps = (state) => ({
  cart: cartSelector(state),
});

export default connect(mapStateToProps)(CartConfirm);
