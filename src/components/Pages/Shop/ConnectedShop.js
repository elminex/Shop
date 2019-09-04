import { connect } from 'react-redux';
import { allProductsSelector, loadProductsRequest, getRequest } from '../../../redux/reducer';
import Shop from './Shop';

const mapStateToProps = (state) => ({
  productsArr: allProductsSelector(state),
  request: getRequest(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadProducts: () => dispatch(loadProductsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
