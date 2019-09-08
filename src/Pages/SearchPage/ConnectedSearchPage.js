import { connect } from 'react-redux';
import { allProductsSelector, loadProductsRequest, getRequest } from '../../redux/reducer';
import SearchPage from './SearchPage';

const mapStateToProps = (state) => ({
  productsArr: allProductsSelector(state),
  request: getRequest(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadProducts: () => dispatch(loadProductsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
