import { connect } from 'react-redux';
import { singleProductSelector, AddProductToCart } from '../../redux/reducer';
import AddToCart from './AddToCart';

const mapStateToProps = (state, ownProps) => ({
  product: singleProductSelector(state, ownProps.match.params.id),
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product) => dispatch(AddProductToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
