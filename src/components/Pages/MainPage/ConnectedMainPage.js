import { connect } from 'react-redux';
import { allProductsSelector, loadProductsRequest, getRequest } from '../../../redux/reducer';
import MainPage from './MainPage';

const mapStateToProps = (state) => ({
  products: allProductsSelector(state),
  request: getRequest(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadProducts: () => dispatch(loadProductsRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
