import { connect } from 'react-redux';
import { singleProductSelector, getRequest, loadProductsRequest } from '../../../redux/reducer';
import Product from './Product';

const mapStateToProps = (state, ownProps) => ({
  product: singleProductSelector(state, ownProps.match.params.id),
  request: getRequest(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadProducts: () => dispatch(loadProductsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
